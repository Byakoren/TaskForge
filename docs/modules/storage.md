# Module `storage.js`

> Gère la persistance locale des tâches via `localStorage`.

---

## Rôle
Ce module centralise la gestion du stockage des tâches pour l’application TaskForge.  
Il offre une abstraction simple permettant au reste du code d’interagir avec les données sans dépendre directement de `localStorage`.

---

## Fonctions exportées

### `loadTasks()`
- **Description :** lit la clé `taskforge_tasks` dans `localStorage`
- **Retour :** `Array<{id:number,text:string,done:boolean}>`
- **Comportement :**
  - Retourne `[]` si aucune donnée n’est trouvée
  - Gère les erreurs de parsing (`try/catch`)

### `saveTasks(tasks)`
- **Paramètre :** `tasks` (tableau d’objets `{id,text,done}`)
- **Description :** convertit le tableau en JSON et l’enregistre dans `localStorage`
- **Retour :** `void`

---

## Clé utilisée
`taskforge_tasks` — nom unique du stockage local

---

## Remarques
- Les données sont stockées dans le navigateur de l’utilisateur.
- Aucune synchronisation serveur n’est faite à ce stade.
- Les futures versions (PostgreSQL, API) réutiliseront cette interface pour conserver la compatibilité.
