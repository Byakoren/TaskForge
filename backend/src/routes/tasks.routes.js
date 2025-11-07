/**
 * Module : tasks.routes.js
 * Rôle   : définit les routes REST `/api/tasks` (CRUD complet sur les tâches).
 *
 * On garde les mêmes endpoints et le même format de réponse { data: ... }.
 * On remplace seulement la persistance fichier par le store (getDb/setDb).
 */

const { Router } = require("express");
const { getDb, setDb } = require("../utils/store"); // <-- remplace fs/path
const router = Router();

/** Calculer le prochain id disponible (entier positif, comme avant) */
function nextId(tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) return 1;
  return Math.max(...tasks.map(t => Number(t.id) || 0)) + 1;
}

/**
 * GET /api/tasks
 * Retourne la liste complète des tâches (même shape qu'avant)
 * Réponse : { data: Task[] }
 */
router.get("/", (_req, res) => {
  const db = getDb();
  res.status(200).json({ data: db.tasks || [] });
});

/**
 * POST /api/tasks
 * Body attendu: { "title": "Texte de la tâche" }
 * Réponse : { data: Task } (et Location sur la ressource créée)
 */
router.post("/", (req, res) => {
  const { title } = req.body ?? {};
  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid "title": non-empty string required' });
  }

  const db = getDb();
  const tasks = Array.isArray(db.tasks) ? db.tasks : (db.tasks = []);

  const task = {
    id: nextId(tasks),
    title: title.trim(),
    done: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  setDb(db); // écriture asynchrone via la file d’écriture

  return res.status(201).location(`/api/tasks/${task.id}`).json({ data: task });
});

/**
 * PUT /api/tasks/:id
 * Body accepté: { "title"?: string, "done"?: boolean }
 * Réponse : { data: Task }
 */
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid "id" param (must be a positive integer)' });
  }

  const { title, done } = req.body ?? {};
  const hasTitle = typeof title === "string";
  const hasDone = typeof done === "boolean";
  if (!hasTitle && !hasDone) {
    return res.status(400).json({
      error: 'Provide at least one valid field: "title" (string) or "done" (boolean)',
    });
  }

  const db = getDb();
  const tasks = Array.isArray(db.tasks) ? db.tasks : (db.tasks = []);
  const idx = tasks.findIndex(t => Number(t.id) === id);
  if (idx === -1) {
    return res.status(404).json({ error: `Task ${id} not found` });
    }

  const current = tasks[idx];
  const updated = {
    ...current,
    ...(hasTitle ? { title: title.trim() } : {}),
    ...(hasDone ? { done } : {}),
    updatedAt: new Date().toISOString(),
  };

  tasks[idx] = updated;
  setDb(db);

  return res.status(200).json({ data: updated });
});

/**
 * DELETE /api/tasks/:id
 * Réponse : 204 No Content
 */
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid "id" param (must be a positive integer)' });
  }

  const db = getDb();
  const tasks = Array.isArray(db.tasks) ? db.tasks : (db.tasks = []);
  const before = tasks.length;
  db.tasks = tasks.filter(t => Number(t.id) !== id);

  if (db.tasks.length === before) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  setDb(db);
  return res.status(204).send();
});

/**
 * BONUS non-cassant :
 * PATCH /api/tasks/:id/toggle → permet au front d'appeler /toggle si besoin.
 * Réponse : { data: Task }
 */
router.patch("/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid "id" param (must be a positive integer)' });
  }

  const db = getDb();
  const tasks = Array.isArray(db.tasks) ? db.tasks : (db.tasks = []);
  const t = tasks.find(x => Number(x.id) === id);
  if (!t) return res.status(404).json({ error: "Task not found" });

  t.done = !t.done;
  t.updatedAt = new Date().toISOString();
  setDb(db);

  return res.status(200).json({ data: t });
});

module.exports = router;