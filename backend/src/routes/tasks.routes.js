/**
 * Module : tasks.routes.js
 * Rôle   : définit les routes REST `/api/tasks` (CRUD complet sur les tâches).
 *
 * 📘 Documentation :
 * https://github.com/Byakoren/TaskForge/blob/main/docs/backend/tasks.routes.md
 *
 * Ce module utilise le routeur Express pour exposer les endpoints :
 * - `GET /api/tasks`    → liste toutes les tâches
 * - `POST /api/tasks`   → crée une nouvelle tâche
 * - `PUT /api/tasks/:id` → met à jour une tâche existante
 * - `DELETE /api/tasks/:id` → supprime une tâche
 *
 * Intégré dans :
 * - `app.js` → via `app.use('/api/tasks', tasksRouter)`
 *
 * Fonctions internes :
 * - `readTasks()`  → lit et parse le fichier JSON
 * - `writeTasks()` → sauvegarde les modifications
 * - `nextId()`     → calcule le prochain ID disponible
 * - `parseId()`    → valide le paramètre `id`
 *
 * Persistance :
 * Les données sont stockées localement dans `src/data/tasks.json`
 * (avant migration vers PostgreSQL en Semaine 10).
 */


const { Router } = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = Router();

// Chemin vers le store JSON
const DATA_PATH = path.join(__dirname, '..', 'data', 'tasks.json');

/**
 * HELPERS
 *
 * readTasks()  - lit et parse le fichier JSON des tâches, vérifie le format.
 * writeTasks() - écrit le tableau de tâches dans le fichier JSON.
 * nextId()     - calcule le prochain id numérique disponible.
 * parseId()    - parse et valide le paramètre "id" de la route.
 */

/** Lire les tâches depuis le fichier JSON */
async function readTasks() {
  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) {
    const e = new Error('Data format invalid');
    e.status = 500;
    throw e;
  }
  return data;
}

/** Écrire les tâches dans le fichier JSON */
async function writeTasks(tasks) {
  await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
}

/** Calculer le prochain id disponible (entier positif) */
function nextId(tasks) {
  if (!tasks.length) return 1;
  return Math.max(...tasks.map(t => Number(t.id) || 0)) + 1;
}

/** Parser et valider le paramètre id (doit être un entier positif) */
function parseId(param) {
  const id = Number(param);
  if (!Number.isInteger(id) || id <= 0) {
    const e = new Error('Invalid "id" param (must be a positive integer)');
    e.status = 400;
    throw e;
  }
  return id;
}

/**
 * GET /api/tasks
 * Retourne la liste complète des tâches
 */
router.get('/', async (_req, res, next) => {
  try {
    const tasks = await readTasks();
    res.status(200).json({ data: tasks });
  } catch (err) {
    if (err.code === 'ENOENT') {
      err.status = 500;
      err.message = 'Tasks store not found (src/data/tasks.json).';
    }
    next(err);
  }
});

/**
 * POST /api/tasks
 * Body attendu: { "title": "Texte de la tâche" }
 * Crée une tâche: { id, title, done:false, createdAt }
 */
router.post('/', async (req, res, next) => {
  try {
    const { title } = req.body || {};

    // Validation simple
    if (typeof title !== 'string' || title.trim().length === 0) {
      const e = new Error('Invalid "title": non-empty string required');
      e.status = 400;
      throw e;
    }

    const tasks = await readTasks();

    const task = {
      id: nextId(tasks),
      title: title.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [...tasks, task];
    await writeTasks(updated);

    // 201 Created + Location (bonne pratique REST)
    res
      .status(201)
      .location(`/api/tasks/${task.id}`)
      .json({ data: task });
  } catch (err) {
    // fichier manquant → message clair (comme pour GET)
    if (err.code === 'ENOENT') {
      err.status = 500;
      err.message = 'Tasks store not found (src/data/tasks.json).';
    }
    next(err);
  }
});

/**
 * PUT /api/tasks/:id
 * Body accepté: { "title"?: string, "done"?: boolean }
 * Modifie partiellement la tâche ciblée.
 */
router.put('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const { title, done } = req.body ?? {};

    const hasTitle = typeof title === 'string';
    const hasDone = typeof done === 'boolean';
    if (!hasTitle && !hasDone) {
      const e = new Error('Provide at least one valid field: "title" (string) or "done" (boolean)');
      e.status = 400;
      throw e;
    }

    const tasks = await readTasks();
    const idx = tasks.findIndex(t => Number(t.id) === id);
    if (idx === -1) {
      const e = new Error(`Task ${id} not found`);
      e.status = 404;
      throw e;
    }

    const current = tasks[idx];
    const updated = {
      ...current,
      ...(hasTitle ? { title: title.trim() } : {}),
      ...(hasDone ? { done } : {}),
      updatedAt: new Date().toISOString(),
    };

    tasks[idx] = updated;
    await writeTasks(tasks);

    res.status(200).json({ data: updated });
  } catch (err) {
    if (err.code === 'ENOENT') {
      err.status = 500;
      err.message = 'Tasks store not found (src/data/tasks.json).';
    }
    next(err);
  }
});

/**
 * DELETE /api/tasks/:id
 * Supprime la tâche (204 No Content si OK).
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const tasks = await readTasks();
    const before = tasks.length;
    const remaining = tasks.filter(t => Number(t.id) !== id);

    if (remaining.length === before) {
      const e = new Error(`Task ${id} not found`);
      e.status = 404;
      throw e;
    }

    await writeTasks(remaining);
    res.status(204).send(); // No Content
  } catch (err) {
    if (err.code === 'ENOENT') {
      err.status = 500;
      err.message = 'Tasks store not found (src/data/tasks.json).';
    }
    next(err);
  }
});

module.exports = router;