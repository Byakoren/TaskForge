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