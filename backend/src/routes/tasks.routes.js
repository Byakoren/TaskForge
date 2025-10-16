const { Router } = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = Router();

// Chemin vers le store JSON
const DATA_PATH = path.join(__dirname, '..', 'data', 'tasks.json');

// Lire les tâches depuis le fichier JSON
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

async function writeTasks(tasks) {
  await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
}

function nextId(tasks) {
  if (!tasks.length) return 1;
  return Math.max(...tasks.map(t => Number(t.id) || 0)) + 1;
}

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
        res.status(201)
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

module.exports = router;
