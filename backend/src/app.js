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