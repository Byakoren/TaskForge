# ARCHITECTURE — Semaine 8 (Board Tâches & UI/UX)

## 1. Objectif

Améliorer l’expérience utilisateur autour des tâches sans changer l’architecture globale :

- transformer la page `/tasks` en **board Kanban 3 colonnes** (À faire / En cours / Terminées),
- ajouter du **Drag & Drop** avec `@dnd-kit` pour déplacer les tâches entre colonnes,
- ajouter une **barre de recherche** + **panneau de filtres** (colonnes visibles),
- introduire un **thème clair/sombre** avec bascule en navbar et styles dédiés,
- faire quelques ajustements d’**accessibilité** (ARIA, shortcuts).

⚠️ Aucun changement côté API / BDD : on réutilise l’API et l’auth mises en place en Semaine 7.

---

## 2. Structure liée à S8

    web/next/
      app/
        page.tsx                # Accueil (publique)
        tasks/
          page.tsx              # Page de gestion des tâches (board Kanban + DnD + filtres)
        login/
          page.tsx              # Page de connexion (publique)
        SSR/
          page.tsx              # Démo SSR (rendu côté serveur)
        SSG/
          page.tsx              # Démo SSG + ISR (rendu statique + revalidate)
        providers.tsx           # Fournit AuthProvider / TasksProvider globalement
        layout.tsx              # Layout global (navbar, footer, ThemeToggle, etc.)

      components/
        TaskForm.tsx            # Formulaire d’ajout de tâche (client)
        NavUser.tsx             # Menu utilisateur (avatar + logout)
        ThemeToggle.tsx         # Bascule thème clair/sombre (stockage localStorage)

      context/
        TasksContext.tsx        # Gestion côté front des tâches (fetch /api/tasks)
        AuthContext.tsx         # Gestion côté front de l’auth (user + token + login/logout)

      styles/
        globals.css             # Thème dark par défaut + variantes light via [data-theme]

      types/
        task.ts                 # Type Task utilisé côté front

      # backend/API (hérité de Semaine 7, inchangé)
      app/api/
        tasks/
          data.ts               # Store en mémoire + fonctions CRUD
          route.ts              # GET /api/tasks, POST /api/tasks
          [id]/
            route.ts            # PUT /api/tasks/:id, DELETE /api/tasks/:id
        auth/
          login/
            route.ts            # POST /api/auth/login

      lib/
        auth.ts                 # Service d’auth (verifyCredentials)

---

## 3. Page `/tasks` : board Kanban & Drag & Drop

### 3.1. Structure de la page

Fichier : `app/tasks/page.tsx`

Rôle de la page :

- protéger l’accès via l’auth (redirection vers `/login` si non connecté),
- consommer `TasksContext` pour récupérer les tâches,
- afficher un **board 3 colonnes** avec :
  - formulaire d’ajout (`TaskForm`),
  - recherche + filtres,
  - colonnes **À faire**, **En cours**, **Terminées**,
  - Drag & Drop entre colonnes.

Organisation interne :

- `TasksPage`  
  → wrap dans `TasksProvider` et `TasksGate`.

- `TasksGate`  
  → lit `AuthContext`, gère la redirection vers `/login`.

- `TasksContent`  
  → logique principale :
    - state local (recherche, filtres, édition inline),
    - utilisation de `useTasks()` pour accéder aux tâches et aux mutations,
    - gestion du DnD avec `DndContext`.

- `BoardColumn`  
  → composant colonne :
    - utilise `useDroppable({ id })` (dnd-kit) pour recevoir les tâches,
    - affiche le titre, un dot coloré, le compteur, et la liste des cartes.

- `DraggableTaskCard`  
  → composant “carte de tâche” draggable :
    - utilise `useDraggable({ id, data: { column } })`,
    - applique la `transform` renvoyée par dnd-kit,
    - affiche le contenu de la tâche (checkbox, titre, actions).

### 3.2. Gestion des colonnes

Les colonnes sont typées :

    type ColumnId = "todo" | "doing" | "done";

La séparation des tâches se fait dans `TasksContent` :

- `rawTodo` : tâches avec `status === "todo"` ou sans status et non terminées,
- `rawDoing` : tâches avec `status === "doing"`,
- `rawDone` : tâches avec `status === "done"` ou `done === true`.

Les colonnes visibles sont contrôlées par un state local :

    const [visibleColumns, setVisibleColumns] = useState({
      todo: true,
      doing: true,
      done: true,
    });

Un panneau de filtres permet de masquer/afficher chaque colonne.

### 3.3. Drag & Drop entre colonnes (dnd-kit)

Librairie : `@dnd-kit/core`

- `DndContext` englobe la zone du board :
  - prop principale : `onDragEnd={handleDragEnd}`.

- `useDroppable({ id })` sur chaque `BoardColumn` :
  - `id` = `"todo" | "doing" | "done"`,
  - `isOver` permet d’appliquer un highlight visuel sur la colonne survolée.

- `useDraggable({ id: task.id, data: { column } })` sur chaque tâche :
  - `transform` convertie en `translate3d(...)`,
  - `isDragging` gère le curseur et la profondeur (z-index).

Logique au drop :

    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (!over) return;

      const columnId = over.id;                  // "todo" | "doing" | "done"
      if (columnId !== "todo" && columnId !== "doing" && columnId !== "done") {
        return;
      }

      const taskId = String(active.id);
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      if (task.status === columnId) return;

      void setStatus(taskId, columnId);          // mutation fournie par TasksContext
    }

⚠️ Semaine 8 : on gère le **changement de colonne**, pas encore le **réordonnancement fin** à l’intérieur d’une colonne (ça viendra quand on aura une vraie BDD avec un champ `position`).

---

## 4. Thème clair / sombre

### 4.1. Toggle et persistance

Fichier : `components/ThemeToggle.tsx`

- Composant client (`"use client"`), affiché dans la navbar (`layout.tsx`).
- State local `theme: "light" | "dark"`.
- Initialisation :
  - lecture du `localStorage` (`taskforge-theme`),
  - fallback sur `prefers-color-scheme` du navigateur si aucune valeur stockée,
  - mise à jour de `document.documentElement.dataset.theme`.

- À chaque changement :
  - `document.documentElement.dataset.theme = theme`,
  - persistance dans `localStorage`.

### 4.2. Application des styles

Fichier : `styles/globals.css`

- Thème sombre = design par défaut (background violets / bleus, cartes sombres).
- Thème clair activé via :

    html[data-theme="light"] {
      /* Overrides pour le body, la navbar, les cartes, les textes… */
    }

Les classes principales (exemples) :

- `.card`, `.card-static`, `.board-column`, `.task-card`  
  → ont un look sombre par défaut, puis une variante orangée/plus claire en mode light.

- `.theme-toggle`, `.nav-user-btn`  
  → boutons ronds en navbar, avec styles adaptés au thème.

L’architecture reste simple : **un seul fichier CSS global** avec :

- un bloc `@layer base` pour les styles généraux,
- un bloc `@layer components` pour les classes réutilisables,
- et des overrides `html[data-theme="light"] .classname { ... }` pour le thème clair.

---

## 5. Recherche & filtres sur les tâches

### 5.1. Recherche locale

Dans `TasksContent` :

- `query` : ce que tape l’utilisateur dans l’input “Rechercher une tâche…”.
- `matchesQuery(task)` : fonction qui renvoie `true` si le titre contient la chaîne recherchée (insensible à la casse).

La recherche est **pure front** : on filtre simplement les tableaux `rawTodo`, `rawDoing`, `rawDone` avant affichage.

### 5.2. Panneau de filtres (colonnes visibles)

Dans `TasksContent` :

- `filtersOpen` : ouvre/ferme le panneau.
- `visibleColumns` : structure `{ todo: boolean; doing: boolean; done: boolean }`.
- `toggleColumn(key)` : inverse la visibilité d’une colonne.
- `resetColumns()` : remet toutes les colonnes à `true`.

UI :

- bouton “☰ Filtres” à droite de la barre de recherche,
- panneau flottant (absolute dans la card) qui contient :
  - 3 checkboxes (À faire / En cours / Terminées),
  - un bouton “Réinitialiser”.

### 5.3. Accessibilité du panneau

- Bouton “Filtres” :
  - `aria-haspopup="true"`,
  - `aria-expanded={filtersOpen}`,
  - `aria-controls="tasks-filters-panel"`.

- Panneau :
  - `id="tasks-filters-panel"`,
  - `role="group"`,
  - `aria-label="Filtres d’affichage des colonnes"`.

- Raccourci :
  - un `useEffect` écoute la touche `Escape` pour fermer le panneau si `filtersOpen` est `true`.

---

## 6. Pages front concernées

### 6.1. Page `/login`

Fichier : `app/login/page.tsx`

- Inchangée par la semaine 8 :
  - formulaire de connexion,
  - usage d’`AuthContext` pour appeler `login`,
  - redirection vers `/tasks` en cas de succès.

### 6.2. Page `/tasks`

Fichier : `app/tasks/page.tsx`

- Toujours protégée via l’auth :
  - lecture de `AuthContext`,
  - redirection côté client vers `/login` si `user` est `null`.

- Nouveautés S8 :
  - UI évolue d’une simple liste à un **board Kanban 3 colonnes**,
  - ajout du **Drag & Drop** via dnd-kit,
  - ajout de la **recherche** (local) et des **filtres de colonnes**,
  - édition inline des titres de tâches (input dans la carte).

---

## 7. Limites actuelles et évolutions prévues

- Aucune modification backend :
  - API `/api/tasks` et `/api/auth/login` restent identiques à la Semaine 7,
  - toujours pas de vraie base de données (store en mémoire côté serveur).

- Drag & Drop limité :
  - on déplace les tâches **entre colonnes**,
  - mais **pas encore** de gestion d’un ordre de priorité persistant dans une même colonne (pas de champ `position` en BDD pour le moment).

- Thème :
  - gestion simple via `data-theme` + `localStorage`,
  - pas encore de préférence stockée côté utilisateur en base.

Évolutions possibles pour les prochaines semaines :

- introduire une vraie BDD (ex : PostgreSQL via Docker Compose),
- ajouter un champ `position` pour les tâches afin de gérer un **ordre de priorité** persistant,
- brancher un DnD “sortable” plus avancé (réordonnancement dans une colonne),
- persister le thème et les filtres côté utilisateur (profil / settings).
