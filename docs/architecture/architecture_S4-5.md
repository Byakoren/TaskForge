# ARCHITECTURE — Semaines 4–5 (Intégration React)

> **Portée :** migration du front JS/TS vers **React**.  
> **Objectif :** transformer l’app en composants réactifs, gérer le state via `useState`/`useEffect`, introduire **Context** (state global) et **Router** (S5), et relier le tout à l’API Express.

---

## 1) Vue d’ensemble

```
[React (Vite + TS)]
   ├─ Components (UI)
   ├─ Context (state global)
   ├─ lib/api.ts (fetch)
   └─ Router (vues /, /todo, /done)
            │
            ▼
[API Express]
   ├─ app.js (config)
   ├─ server.js (listen + loadDb)
   ├─ routes/tasks.routes.js  (CRUD + PATCH /toggle)
   └─ utils/store.js          (cache mémoire + file d’écriture vers JSON)
            │
            ▼
[src/data/tasks.json]  (persistance)
```

- **Front** : React + TypeScript, packagé par **Vite**, CSS global minimal.  
- **Back** : Express **CommonJS** (require/module.exports), logs `morgan`, CORS, JSON parser.  
- **Persistance** : fichier JSON via un **store** qui évite les blocages disque et les redémarrages nodemon.

---

## 2) Arborescence (réelle)

```
taskforge/
├─ frontend/
│  ├─ index.html
│  ├─ vite.config.ts             # proxy /api → http://localhost:3001
│  └─ src/
│     ├─ main.tsx                # mount + Router + Provider
│     ├─ App.tsx                 # layout + tabs + <Outlet/>
│     ├─ types.ts                # Task, ID
│     ├─ lib/api.ts              # appels REST (GET/POST/PATCH/DELETE) + normalisation {data}
│     ├─ context/TasksContext.tsx# state global: tasks, loading, add/toggle/remove/reload
│     ├─ components/
│     │  ├─ TaskForm.tsx
│     │  ├─ TaskList.tsx
│     │  ├─ TaskItem.tsx
│     │  └─ TasksCounter.tsx
│     └─ pages/
│        └─ TasksPage.tsx        # filtre par route: all/todo/done
│
└─ backend/
   ├─ src/
   │  ├─ app.js                  # middlewares + /api/tasks + /api/health
   │  ├─ server.js               # await loadDb(); app.listen(PORT)
   │  ├─ routes/
   │  │  └─ tasks.routes.js      # GET/POST/PUT/DELETE + PATCH :id/toggle (format {data})
   │  ├─ utils/
   │  │  └─ store.js             # getDb/setDb/loadDb + file d’écriture (flush)
   │  ├─ middlewares/
   │  │  └─ errors.js            # notFound + errorHandler
   │  └─ data/
   │     └─ tasks.json
   └─ nodemon.json               # ignore src/data/*.json
```

Ports par défaut : **frontend 5173**, **backend 3001** (proxy Vite).

---

## 3) Modèle de données

**TypeScript (frontend/src/types.ts)**

```ts
export type ID = string | number;

export type Task = {
  id: ID;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
};
```

**Backend (format de réponse JSON)**  
- **Liste** : `{ "data": Task[] }`  
- **Item**  : `{ "data": Task }`  
- **Delete** : `204 No Content`

Le client (`lib/api.ts`) **normalise** aussi les variantes (array direct ou `{data}`) pour robustesse.

---

## 4) Flux de données (front)

```
UI (TaskForm / TaskItem) ──► Context (add/toggle/remove) ──► lib/api.ts (fetch)
      ▲                                  │
      │                                  ▼
   TaskList ◄────────────── tasks (state global) ◄──── reload/useEffect
```

- `TasksContext` centralise l’état (`tasks`, `loading`) + actions asynchrones.
- **Optimistic update** : l’UI est mise à jour immédiatement, puis confirmée par l’API.
- `useEffect` initial `reload()` avec garde anti-double exécution (StrictMode dev).

---

## 5) API Express (routes clés)

```
GET    /api/tasks            → 200 { data: Task[] }
POST   /api/tasks            → 201 { data: Task }   + Location
PUT    /api/tasks/:id        → 200 { data: Task }
PATCH  /api/tasks/:id/toggle → 200 { data: Task }
DELETE /api/tasks/:id        → 204
```

**Règles :**
- Validation minimale (`title` non vide, `id` entier positif si numérique).
- Formats stables (toujours `{data}` sauf DELETE).  
- Logs `morgan`, erreurs centralisées (`errors.js`).

---

## 6) Persistance : `utils/store.js` (file d’écriture)

**Pourquoi ?**  
Éviter le blocage de l’event loop et les redémarrages nodemon quand `tasks.json` est réécrit.

**Principe :**
- `getDb()` retourne le cache en mémoire (ex. `{ tasks: Task[] }`)
- `setDb(db)` marque le cache comme “sale” et **déclenche `flush()`** en arrière-plan
- `flush()` sérialise **une seule fois** (regroupe les modifications rapprochées)
- `loadDb()` charge (et normalise) au démarrage ; crée le dossier si nécessaire

**Chemin robuste :** `path.join(__dirname, "../data/tasks.json")`

---

## 7) Routing & filtres (S5)

- `react-router-dom` avec 3 routes : `/` (all), `/todo`, `/done`
- Composant `TasksPage` reçoit `filter` et dérive la liste :
  ```ts
  const filtered = tasks.filter(t =>
    filter === "all" ? true : filter === "todo" ? !t.done : t.done
  );
  ```
- Barre d’onglets via `<NavLink>` ; zone de rendu via `<Outlet>`
- `TasksCounter` calcule **state dérivé** : `{todo} / {total}` (+ % done)

---

## 8) Gestion des erreurs & robustesse (front)

- `try/catch` autour des appels `api.*` → l’UI reste stable même si l’API redémarre
- Normalisation des réponses dans `lib/api.ts` (accepte `{data}` et `[]`)
- Comparaison d’IDs **string/number** via `String(id)` pour éviter les mismatches

---

## 9) Performances & DX

- **Vite proxy** pour éviter CORS : `/api` → `http://localhost:3001`
- **StrictMode dev** : garde avec `useRef` pour éviter le double `reload()`
- **nodemon.json** : ignore `src/data/*.json` (pas de restart sur persistance)
- **Memo** léger (`useMemo`) pour dérivés simples (compteur)

---

## 10) Tests attendus

- **Manuels (UI)** : ajouter, cocher/décocher, supprimer, recharger la page
- **Postman** : CRUD complet + statuts `200/201/204/4xx`
- **Persistance** : vérifier que `src/data/tasks.json` évolue bien
- (optionnel) **RTL** : vérifier que `TaskList` affiche `N` items après mock de `Context`

---

## 11) Points d’extension (S6+)

- **Recherche** côté front (filtre texte + debounce)
- **Bulk actions** (supprimer terminées, tout cocher/décocher)
- **Toasts d’erreur** (retours visibles sur échecs réseau)
- **Thème** (dark/light) via CSS variables
- **Next.js** (S7+) : migration progressive en conservant les concepts (Router/Context)

---

## 12) Décisions techniques (résumé)

- **CommonJS** pour tout le backend (cohérence, simplicité Node)
- **Format API** : `{ data: ... }` conservé pour stabilité/documentation
- **ID** : `string | number` côté front (compatibilité back)
- **Store** : cache mémoire + flush, chemin basé sur `__dirname`
- **Ports** : 5173 (front), 3001 (back), proxy Vite actif
