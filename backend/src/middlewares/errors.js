/**
 * Module : error.js
 * Rôle   : centralise la gestion des erreurs et des réponses HTTP côté backend.
 *
 * 📘 Documentation :
 * https://github.com/Byakoren/TaskForge/blob/main/docs/backend/error.md
 *
 * Ce module définit deux middlewares Express :
 * - `notFound` : intercepte toute requête vers une route inexistante et génère une erreur 404.
 * - `errorHandler` : capture les erreurs transmises (via `next(err)`) et renvoie une réponse JSON cohérente.
 *
 * Fonctionnement :
 * - `notFound` doit être monté **après toutes les routes**.
 * - `errorHandler` doit être monté **en dernier middleware** dans `app.js`.
 *
 * Dépendances :
 * - Express (objets `req`, `res`, `next`)
 * - Variable d’environnement `NODE_ENV` (affichage ou non du stack trace)
 *
 * Exemples :
 * - Route inexistante → `GET /api/unknown` → 404 + JSON `{ error: { message: "Not Found - /api/unknown" } }`
 * - Erreur interne → 500 + JSON `{ error: { message: "Internal Server Error", stack: ... } }`
 *
 * Intégré dans :
 * - `app.js` → via `app.use(notFound)` puis `app.use(errorHandler)`
 */


//middleware 404 : not found
function notFound(req, res, next) {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    err.status = 404;
    next(err);
}

//middleware gestion des erreurs
function errorHandler(err, req, res, next) {
    const status = err.status || 500;

    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
            ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {}),
        },
    });
}

module.exports = { notFound, errorHandler };