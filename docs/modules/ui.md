# Module : `ui.js` (implémentation réelle)

> **Objectif** : gérer le **rendu DOM** (3 colonnes) et les **interactions** utilisateur (ajout, toggle, déplacement entre états, renommage, suppression) via un menu contextuel simple.  
> **Rôle** : Vue “dumb” : ne stocke pas la donnée — elle **remonte** les actions à `main.js` via des callbacks et **affiche** ce qu’on lui passe.

---

## 1) Sélecteurs & structure DOM attendue

```js
const S = {
  form:  "#task-form",
  input: "#task-input",
  todo:  "#list-todo",
  doing: "#list-doing",
  done:  "#list-done",
};
```

Le HTML doit fournir :
- un **formulaire** d’ajout (`#task-form`) avec un bouton submit et un input (`#task-input`),
- **trois listes** correspondant aux statuts `todo`, `doing`, `done` :
  - `#list-todo`
  - `#list-doing`
  - `#list-done`

Chaque **item** rendu est un `<li class="task-item" data-id="...">` contenant :
- une zone **meta** avec la **checkbox** (toggle) et le **titre**
- un **bouton kebab** (⋯) pour ouvrir un **menu d’actions**
- un `<div class="menu" role="menu" hidden>` avec :
  - **Changer d’état** : boutons `data-menu="move"` + `data-to="todo|doing|done"`
  - **Autres** : `data-menu="rename"` et `data-menu="delete"`

---

## 2) API publique

### `initUI({ onAdd, onToggle, onMove, onRename, onDelete })`
Enregistre les **callbacks** et les **écouteurs** :
- `submit` sur le formulaire → `onAdd(title)`
- `click` sur les listes → délégation vers `onListClick` :
  - `data-action="toggle"` → `onToggle(id)`
  - `data-action="menu"`   → ouvre/ferme le menu de l’item
  - `data-menu="move" data-to="..."` → `onMove(id, toStatus)` puis ferme menu
  - `data-menu="rename"` → `prompt()` puis `onRename(id, newTitle)` puis ferme menu
  - `data-menu="delete"` → `confirm()` puis `onDelete(id)` puis ferme menu
- global :
  - `document.click` : si clic **hors** d’un `.task-item` → fermer le menu ouvert
  - `document.keydown` : **Escape** → fermer le menu ouvert

> Les callbacks sont rendus sûrs via `fn(f)` (ne s’exécutent que si c’est bien une fonction).

### `render(tasks = [])`
- Vide les 3 colonnes (`#list-todo`, `#list-doing`, `#list-done`).
- Construit 3 `DocumentFragment` (todo/doing/done) pour un rendu performant.
- Pour chaque tâche :
  - crée un `<li>` avec `data-id`,
  - applique `is-done` sur le titre si `t.done === true`,
  - insère le bouton kebab et le menu conforme aux actions,
  - pousse l’item dans le fragment de sa **colonne** selon `t.status` (fallback `"todo"`).
- Monte les fragments dans le DOM en **une passe**.

### `setLoading(is: boolean)`
Désactive/réactive les contrôles d’ajout :
- `button[type=submit]` et `#task-input`.

---

## 3) Détails d’implémentation

### État local d’UI
```js
let openMenuFor = null; // id de la tâche dont le menu est ouvert (sinon null)
```

### Gestion du menu
```js
function toggleMenuFor(li, id) {
  if (openMenuFor && openMenuFor !== id) closeAnyMenu();
  const menu = li.querySelector(".menu");
  if (!menu) return;
  const isHidden = menu.hasAttribute("hidden");
  if (isHidden) { menu.removeAttribute("hidden"); openMenuFor = id; }
  else          { menu.setAttribute("hidden", ""); openMenuFor = null; }
}

function closeAnyMenu() {
  if (!openMenuFor) return;
  const open = document.querySelector(\`li[data-id="\${openMenuFor}"] .menu\`);
  if (open) open.setAttribute("hidden", "");
  openMenuFor = null;
}
```

### Délégation d’événements sur les listes
```js
function onListClick(e) {
  const el = e.target;
  const li = el.closest("li[data-id]");
  if (!li) return;
  const id = li.dataset.id;

  if (el.closest("[data-action='toggle']")) { onToggleCb?.(id); return; }
  if (el.closest("[data-action='menu']"))   { toggleMenuFor(li, id); return; }

  const moveBtn = el.closest("[data-menu='move']");
  if (moveBtn) { onMoveCb?.(id, moveBtn.getAttribute("data-to")); closeAnyMenu(); return; }

  if (el.closest("[data-menu='rename']")) { /* prompt + onRename */ }
  if (el.closest("[data-menu='delete']")) { /* confirm + onDelete */ }
}
```

### Helpers internes
- `qs(sel)` : récupère un élément **obligatoire**, lève une erreur claire sinon.
- `fn(f)` : renvoie la fonction si `typeof f === "function"`, sinon `null`.
- `docFrag()` : `document.createDocumentFragment()`.
- `escapeHTML(str)` : échappe `& < > " '` pour éviter les injections **XSS** dans les titres.

---

## 4) Accessibilité & UX

- Bouton kebab : `aria-haspopup="menu"`, `aria-label="Actions"`
- Menu : `role="menu"` et `aria-label`, fermeture par **clic extérieur** et **Escape**.
- Checkbox : zone cliquable via `.task-check` + `title="Basculer terminé"`.
- Rendu **idempotent** et performant (fragments, délégation d’événements).

---

## 5) Contrats exacts avec `main.js`

- `onAdd(title: string)`
- `onToggle(id: string)`
- `onMove(id: string, toStatus: "todo" | "doing" | "done")`
- `onRename(id: string, newTitle: string)`
- `onDelete(id: string)`

`render(tasks)` suppose que chaque tâche porte : `{ id, title, done, status }` et place l’item dans la colonne correspondante.

---

## 6) Tests manuels ciblés

- **Ajout** : saisie + Enter → item en `todo`, input vidé + focus conservé.
- **Toggle** : clique sur la checkbox → titre barré/débarré, persiste après refresh (via main).
- **Menu** :
  - bouton ⋯ → ouverture/fermeture, un seul menu ouvert à la fois,
  - Move → l’item migre de colonne (todo/doing/done),
  - Rename → prompt, mise à jour titre,
  - Delete → confirm, suppression.
- **Fermeture globale** : clic hors item ou **Échap** → ferme le menu ouvert.
- **Loading** : input et bouton submit désactivés pendant `setLoading(true)`.

---

**Dernière mise à jour :** _Semaine 2 — MVP LocalStorage_
