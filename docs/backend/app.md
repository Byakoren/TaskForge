# `app.js` — Initialisation d'Express (TaskForge API)

> Module d’initialisation de l’API Express : configuration des middlewares globaux, routes noyau et gestion centralisée des erreurs.

---

## 1) Contexte & rôle

- **Chemin** : `backend/src/app.js` (adapté selon ton arborescence)
- **Responsabilité** : exposer une instance `Express` prête à être démarrée par `server.js`.
- **Fonctions majeures** :
  - Activer les middlewares globaux (**CORS**, **log HTTP** via `morgan`, **parsing JSON**).
  - Exposer un **endpoint de healthcheck** (`GET /api/health`).
  - Monter le **routeur des tâches** sur `/api/tasks`.
  - Brancher les **middlewares d’erreurs** (`notFound`, `errorHandler`).

> 📚 Docs liées :  
> - [`docs/backend/tasks.routes.md`](./tasks.routes.md) — Endpoints CRUD `/api/tasks`  
> - [`docs/backend/error.md`](./error.md) — Middlewares `notFound` & `errorHandler`  
> - [`docs/backend/architecture_S3.md`](./architecture_S3.md) — Vue d’ensemble de l’API Semaine 3

---

## 2) Dépendances

- [`express`](https://www.npmjs.com/package/express) — framework HTTP
- [`cors`](https://www.npmjs.com/package/cors) — autoriser les requêtes cross‑origin depuis le front
- [`morgan`](https://www.npmjs.com/package/morgan) — logs HTTP (mode `dev`)

---

## 3) Code annoté

```js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());              // Autorise les requêtes cross-origin (front local, etc.)
app.use(morgan('dev'));       // Log concis des requêtes HTTP (méthode, URL, statut, temps)
app.use(express.json());      // Parse automatiquement le JSON du body → req.body

// Healthcheck
app.get('/api/health', (_req, res) => {
    res.json({ service: 'taskforge-api', status: 'ok', timestamp: new Date().toISOString() });
});

// Routeur des tâches
const tasksRouter = require('./routes/tasks.routes');
app.use('/api/tasks', tasksRouter);

// Gestion des 404 et erreurs
const { notFound, errorHandler } = require('./middlewares/errors');
app.use(notFound);            // Si aucune route ne correspond → 404 formatée
app.use(errorHandler);        // Gestion centralisée des erreurs (500, validations, etc.)

module.exports = app;         // Export de l'instance pour démarrage par server.js
```

---

## 4) Contrats & conventions

### 4.1 Healthcheck
- **Route** : `GET /api/health`
- **Réponse 200** :
  ```json
  {
    "service": "taskforge-api",
    "status": "ok",
    "timestamp": "2025-10-17T09:00:00.000Z"
  }
  ```

### 4.2 Parsing JSON
- Toute requête avec `Content-Type: application/json` est parsée dans `req.body`.
- En cas de JSON invalide, `express.json()` déclenche une erreur capturée par `errorHandler`.

### 4.3 CORS
- Par défaut **autorisé pour toutes les origines** (confort en dev).  
  ➜ Ajuster en prod (liste blanche, headers, credentials).

### 4.4 Logs HTTP (Morgan)
- Format `dev` : `GET /api/tasks 200 12.345 ms - 123`

---

## 5) Montage des routes

- **Préfixe global** : `/api`
- **Tâches** : `/api/tasks` → voir `tasks.routes.js`  
  Endpoints CRUD standards : `GET /`, `POST /`, `PUT /:id`, `DELETE /:id`.

> 🧭 Bonne pratique : un **routeur par ressource** (`tasks`, `projects`, etc.) et un **controller** dédié si la logique grossit.

---

## 6) Gestion des erreurs

- `notFound` : middleware terminal qui renvoie une **404 JSON** cohérente si aucune route ne matche.  
- `errorHandler` : middleware centralisé qui **uniformise les réponses d’erreurs** (messages, codes, stack dev).

**Convention de réponse d’erreur (exemple)** :
```json
{
  "error": {
    "message": "Task not found",
    "code": "TASK_NOT_FOUND"
  }
}
```
> Détail complet dans [`error.md`](./error.md).

---

**Dernière mise à jour** : 2025‑10‑17
