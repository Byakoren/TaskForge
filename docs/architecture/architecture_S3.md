# ARCHITECTURE — Semaine 3 (API Express)

> Portée : ajout d’un backend Node.js/Express pour exposer les données via API REST.  
> Objectif : remplacer progressivement LocalStorage par un stockage serveur.

## 1) Vue d’ensemble
```
Frontend (JS/TS) → API Express → stockage JSON ou en mémoire
```

## 2) Structure backend
```
backend/
 ├─ app.js / server.js      # point d’entrée Express
 ├─ routes/
 │   └─ tasks.js            # routes REST /tasks
 ├─ controllers/
 │   └─ tasksController.js  # logique métier
 ├─ middlewares/
 │   └─ errorHandler.js     # gestion des erreurs
 └─ data/
     └─ tasks.json          # stockage local (MVP)
```

## 3) Endpoints REST
| Méthode  | Route            | Description                 |
|----------|------------------|-------------                |
| GET      | `/api/tasks`     | Récupérer toutes les tâches |
| POST     | `/api/tasks`     | Créer une tâche             |
| PUT      | `/api/tasks/:id` | Modifier une tâche          |
| DELETE   | `/api/tasks/:id` | Supprimer une tâche         |

## 4) Intégration front
- `storage.js` devient `async` et utilise `fetch()` :
- `loadTasks()` → `GET /api/tasks`
- `saveTasks()` → `POST/PUT/DELETE /api/tasks`
- `main.js` reste inchangé (mêmes fonctions appelées)
- Transition douce grâce à l’abstraction DAL

## 5) Notes
- Tests avec Postman / Thunder Client  
- Pas encore de base de données (fichier JSON temporaire)  
- Préparation à la persistance PostgreSQL (S10)
