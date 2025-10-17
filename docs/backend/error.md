# `error.js` — Middlewares de gestion d’erreurs

> Module Express responsable de la capture et de la mise en forme des erreurs dans l’API **TaskForge**.

---

## 1) Contexte & rôle

- **Chemin** : `backend/src/middlewares/error.js`
- **Responsabilité** : unifier la gestion des erreurs côté backend.
- **Composants principaux** :
  - `notFound` : middleware pour les routes inexistantes.
  - `errorHandler` : middleware global de gestion des erreurs.

> 📚 Docs liées :
> - [`app.md`](./app.md) — point d’entrée Express
> - [`tasks.routes.md`](./tasks.routes.md) — routes `/api/tasks`

---

## 2) Code annoté

```js
// middleware 404 : not found
function notFound(req, res, next) {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    err.status = 404;
    next(err);
}

// middleware gestion des erreurs
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
```

---

## 3) Fonctionnement

### 🧩 `notFound(req, res, next)`
- Intervient **après toutes les routes déclarées**.
- Crée un objet `Error` avec le message :  
  `"Not Found - /api/route_inexistante"`.
- Ajoute une propriété `status = 404`.
- Transmet l’erreur à `next(err)` → captée ensuite par `errorHandler`.

### 🧩 `errorHandler(err, req, res, next)`
- Reçoit l’erreur via `next(err)`.
- Définit un **code HTTP** à partir de `err.status` (par défaut `500`).
- Envoie une réponse JSON structurée :
  ```json
  {
    "error": {
      "message": "Task not found",
      "stack": "..."
    }
  }
  ```
- En environnement **production**, la propriété `stack` est masquée.

---

## 4) Positionnement dans Express

Ces middlewares doivent être enregistrés **à la fin** du pipeline :

```js
// app.js
const { notFound, errorHandler } = require('./middlewares/error');

app.use('/api/tasks', tasksRouter);

// Gestion des erreurs (en fin de middleware)
app.use(notFound);
app.use(errorHandler);
```

---

## 5) Exemples de réponses

### ❌ Route inexistante
```bash
GET /api/unknown
```
**Réponse :**
```json
{
  "error": {
    "message": "Not Found - /api/unknown"
  }
}
```

### ⚠️ Erreur interne
```bash
GET /api/tasks/undefined
```
**Réponse :**
```json
{
  "error": {
    "message": "Internal Server Error",
    "stack": "..."
  }
}
```

---

**Dernière mise à jour** : 2025‑10‑17
