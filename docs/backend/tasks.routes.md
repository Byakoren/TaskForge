# `tasks.routes.js` — Routes REST `/api/tasks`

> Routeur Express gérant le **CRUD des tâches** avec persistance locale dans `src/data/tasks.json`.

---

## 1) Rôle & périmètre du module

- **Chemin** : `backend/src/routes/tasks.routes.js`
- **Montage** : dans `app.js` → `app.use('/api/tasks', tasksRouter)`
- **Persistance** : fichier JSON `src/data/tasks.json` (MVP avant BDD)

---

## 2) Dépendances minimales

- `express.Router()` — création du routeur
- `fs/promises` — lecture/écriture asynchrones
- `path` — résolution du chemin du store JSON

---

## 3) API interne (helpers)

- `readTasks()` → `Array<Task>` : lit/parse le store, lève `500` si format invalide
- `writeTasks(tasks: Task[])` → `void` : sérialise et sauvegarde
- `nextId(tasks: Task[])` → `number` : prochain identifiant entier
- `parseId(param: string)` → `number` : valide `id` (entier > 0) ou lève `400`

**Type minimal d’une Task**
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

## 4) Endpoints (contrats compacts)

### GET `/api/tasks`
- **200** `{ data: Task[] }`
- 🔁 Erreurs gérées :
  - Store manquant → `500` `Tasks store not found (src/data/tasks.json).`

### POST `/api/tasks`
- **Body** `{ "title": string }` (non vide)
- **201** + `Location: /api/tasks/{id}` `{ data: Task }`
- ❌ `400` si `title` absent/vidé
- 🔁 Erreurs gérées : store manquant → `500`

### PUT `/api/tasks/:id`
- **Body (partiel)** `{ "title"?: string, "done"?: boolean }` (au moins un champ)
- **200** `{ data: Task }` (met à jour `updatedAt`)
- ❌ `400` si aucun champ valide
- ❌ `404` si tâche introuvable
- ❌ `400` si `:id` invalide (non entier > 0)

### DELETE `/api/tasks/:id`
- **204 No Content**
- ❌ `404` si tâche introuvable
- ❌ `400` si `:id` invalide

---

## 5) Notes d’implémentation (strict module)

- Le store JSON est résolu via :  
  `const DATA_PATH = path.join(__dirname, '..', 'data', 'tasks.json');`
- Les messages d’erreur *ENOENT* sont convertis en `500` avec message clair.
- Les dates sont ISO 8601 (`createdAt`, `updatedAt`).

---

## 6) Exemple minimal d’utilisation

```js
// app.js
const tasksRouter = require('./routes/tasks.routes');
app.use('/api/tasks', tasksRouter);
```

**Dernière mise à jour** : 2025‑10‑17
