/**
 * Module : app.js
 * Rôle   : point d’entrée applicatif du backend — instancie et configure Express.
 *
 * Documentation :
 * https://github.com/Byakoren/TaskForge/blob/main/docs/backend/app.md
 *
 * Ce module prépare l’application Express avant son démarrage par `server.js` :
 * - initialise les middlewares globaux (`cors`, `morgan`, `express.json`)
 * - définit un endpoint de santé (`GET /api/health`)
 * - monte le routeur principal des tâches (`/api/tasks`)
 * - gère les erreurs via les middlewares `notFound` et `errorHandler`
 *
 * Intégré dans :
 * - server.js → démarre le serveur HTTP avec l’instance `app`
 *
 * Dépendances :
 * - express — framework HTTP minimaliste
 * - cors — autorise les requêtes cross-origin (front ↔ back)
 * - morgan — log des requêtes HTTP (mode dev)
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Healthcheck
app.get('/api/health', (_req, res) => {
    res.json({ service: 'taskforge-api', status: 'ok', timestamp: new Date().toISOString() });
});

// Routeur des tâches
const tasksRouter = require('./routes/tasks.routes');
app.use('/api/tasks', tasksRouter);

// Gestion des 404 et erreurs
const { notFound, errorHandler } = require('./middlewares/errors');
app.use(notFound);
app.use(errorHandler);

module.exports = app;