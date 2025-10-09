# Module : `main.js` (réel)

> **Objectif** : Orchestrer l’application (MVP LocalStorage), charger/normaliser les données, brancher les callbacks UI et assurer la persistance + rendu.  
> **Rôle** : Point d’entrée qui coordonne `ui.js` et `storage.js` avec un **état en mémoire** (`tasks`).

---

## 1) Aperçu & imports

```js
import { initUI, render, setLoading } from "./ui.js";
import { loadTasks, saveTasks } from "./storage.js";
```

- `initUI(callbacks)` : enregistre les handlers d’interaction.
- `render(tasks)` : déclenche le rendu de la liste.
- `setLoading(bool)` : contrôle un indicateur visuel de chargement.
- `loadTasks()` / `saveTasks(tasks)` : persistance LocalStorage.

---

## 2) État et fonctions clés

```js
let tasks = [];
```

### `boot()`
Séquence d’initialisation :
1. `setLoading(true)` → feedback utilisateur.
2. `tasks = (loadTasks() || [])`
3. Normalisation via `normalizeTask`
4. Tri par `createdAt` décroissant (`sortByCreatedDesc`)
5. `render(tasks)`
6. `setLoading(false)`

### `normalizeTask(t)`
Assure un modèle homogène pour chaque tâche :
```ts
type Task = {
  id: string;
  title: string;
  done: boolean;
  status: "todo" | "doing" | "done"; // "done" prioritaire si done === true
  createdAt: string;                 // ISO 8601
}
```
- Défaut `status` : `done ? "done" : "todo"`
- Défaut `createdAt` : `new Date().toISOString()`
- Force `done` en booléen.

### `sortByCreatedDesc(a, b)`
Tri décroissant par date de création.

### `persistAndRender()`
Couplage persistance + rafraîchissement UI :
```js
saveTasks(tasks);
render(tasks);
```

---

## 3) Handlers métier (branchés dans `initUI`)

### `addTask(title)`
- Crée une tâche (id `crypto.randomUUID()`, `done=false`, `status="todo"`).
- Préfixe dans la liste (`[newTask, ...tasks]`).
- `persistAndRender()`.

### `toggleTask(id)`
- Inverse `done`.
- Met à jour `status` : si `done` devient `true` → `"done"` ; sinon revient à `"todo"` **si** l’ancien `status` était `"done"` (sinon conserve la valeur courante, ex. `"doing"`).
- `persistAndRender()`.

### `moveTask(id, toStatus)`
- Change `status` vers `toStatus` (ex. `todo` → `doing` → `done`).
- Force `done=true` si `toStatus === "done"` (cohérence visuelle/filtrage).
- `persistAndRender()`.

### `renameTask(id, newTitle)`
- Met à jour `title` pour la tâche ciblée.
- `persistAndRender()`.

### `deleteTask(id)`
- Filtre la tâche par `id` pour la supprimer.
- `persistAndRender()`.

---

## 4) Cycle de vie & câblage UI

```js
initUI({
  onAdd: addTask,
  onToggle: toggleTask,
  onMove: moveTask,
  onRename: renameTask,
  onDelete: deleteTask,
});

boot();
```

- Tous les événements UI remontent à ces handlers, **aucun accès direct au DOM** dans `main.js`.
- `main.js` reste le **chef d’orchestre** : il modifie `tasks`, persiste, puis appelle `render`.

---

## 5) Flux de données réel

```
UI Event (initUI) → main.js handler → mutate tasks → saveTasks(tasks) → render(tasks)
                                                   ↘ (done/status règles cohérence)
```

- **Source de vérité** : `tasks` en mémoire.
- **Persistance** : LocalStorage via `storage.js`.
- **Rendu** : `ui.render(tasks)` uniquement après mutation/persistance.

---

## 6) Ergonomie & robustesse

- `setLoading(true/false)` encadre l’amorçage (UX fluide).
- Normalisation systématique (`normalizeTask`) évite les cas incohérents.
- Règle de cohérence : `status="done"` ⇔ `done=true`.

---

## 7) Tests manuels ciblés

- Ajouter → la tâche apparaît en tête et persiste au refresh.
- Toggle → `done` et `status` se synchronisent (vers/depuis `"done"`).
- Move → changer `status` entre `todo/doing/done`, vérifier `done` si `"done"`.
- Rename/Delete → cohérence UI + persistance après refresh.

---

**Dernière mise à jour :** _Semaine 2 — MVP LocalStorage_
