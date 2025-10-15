const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middlewares/errors');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//route test
app.get('/api/test', (req, res) => {
    res.json({
        service: 'taskforge-api',
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
});

// Gestion des 404 et erreurs
app.use(notFound);
app.use(errorHandler);

module.exports = app;