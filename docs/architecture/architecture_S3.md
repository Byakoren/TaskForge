# ARCHITECTURE — Semaine 3 (API Express)

> Portée : ajout d’un backend **Node.js/Express** exposant l’API REST `/api/tasks`.  
> Objectif : fournir un point d’accès serveur (MVP) avant la migration BD (S10).

---

## 1) Vue d’ensemble (flux)
```
Frontend (JS/TS)  ──HTTP──►  API Express  ──FS──►  JSON store (`src/data/tasks.json`)
```

- Front : reste inchangé (appelera l’API via `fetch()` lors de l’adaptation du `storage.js`).
- Back : Express minimal + routeur `tasks` + gestion d’erreurs.
- Persistance : fichier JSON local (temporaire).

---

## 2) Structure réelle (S3)
```
backend/
├─ src/
│  ├─ app.js                 # instance Express + middlewares + montage des routes
│  ├─ server.js              # bootstrap (PORT) et écoute HTTP
│  ├─ routes/
│  │  └─ tasks.routes.js     # CRUD /api/tasks
│  ├─ middlewares/
│  │  └─ error.js            # notFound + errorHandler
│  └─ data/
│     └─ tasks.json          # stockage local MVP
└─ package.json
```

> NB : pas de `controllers/` pour l’instant ; la logique est contenue dans `tasks.routes.js` (helpers).

---

## 3) Endpoints REST (contrats)
| Méthode | Route              | 200/201/204                       | Erreurs notables                  |
|---------|--------------------|-------------                      |-----------------------------------|
| GET     | `/api/tasks`       | 200 `{ data: Task[] }`            | 500 store manquant                |
| POST    | `/api/tasks`       | 201 `{ data: Task }` + `Location` | 400 `title` invalide, 500 store   |
| PUT     | `/api/tasks/:id`   | 200 `{ data: Task }`              | 400 id invalide / body vide, 404  |
| DELETE  | `/api/tasks/:id`   | 204 (No Content)                  | 400 id invalide, 404              |

**Task (MVP)**
```ts
type Task = {
  id: number;
  title: string;
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

---

## 4) Middlewares & erreurs
- `express.json()` : parsing JSON du body.
- `cors()` : CORS permissif (dev).
- `morgan('dev')` : logs HTTP (si activé dans `app.js`).
- `notFound` : 404 uniforme pour routes non trouvées.
- `errorHandler` : JSON d’erreur standardisé ; masque `stack` en prod.

---

## 5) Données & helpers (dans `tasks.routes.js`)
- `DATA_PATH = src/data/tasks.json`
- `readTasks()` / `writeTasks()` : IO asynchrones (FS).
- `nextId()` : incrément simple (max + 1).
- `parseId()` : exige un entier strictement positif (400 sinon).

---

## 6) Variables d’environnement & démarrage
- `PORT` (facultatif) : défaut `3001` (voir `server.js`).
- Démarrage : `node src/server.js` (ou script npm équivalent).

---
