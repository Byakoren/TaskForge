Mini Gestionnaire de Tâches — JS → TypeScript

Un petit projet “preuve de compétence” pour consolider JavaScript puis TypeScript en 1 semaine. On part d’une version JS (DOM + LocalStorage), puis on migre en TS avec typage strict et (en bonus) une API Node/Express.

🎯 Objectifs pédagogiques
  • Manipuler le DOM proprement (sans framework).
  • Structurer le code en modules et classes.
  • Persister des données côté client (LocalStorage).
  • Migrer vers TypeScript (interfaces, classes, generics, enums).
  • (Bonus) Exposer un CRUD REST minimal en Node/Express.


✨ Fonctionnalités attendues (MVP)
  • Ajouter une tâche : titre, description, statut (todo | doing | done).
  • Lister les tâches, marquer comme faite / à faire, supprimer.
  • Filtrer par statut (Tous / À faire / En cours / Faits).
  • Persistance locale (LocalStorage).
  • UX basique mais propre : clavier accessible, messages d’erreur simples.
  • Le MVP doit fonctionner sans backend et offline.

  🧱 Architecture du dépôt
  
              task-manager/
            ├─ README.md
            ├─ CHANGELOG.md
            ├─ LICENSE
            ├─ .editorconfig
            ├─ .gitignore
            ├─ src/
            │  ├─ index.html
            │  ├─ styles.css
            │  ├─ js/              # V1 JavaScript
            │  │  ├─ main.js
            │  │  ├─ storage.js
            │  │  └─ ui.js
            │  └─ ts/              # V2 TypeScript (migration)
            │     ├─ main.ts
            │     ├─ models/
            │     │  └─ Task.ts
            │     ├─ services/
            │     │  ├─ StorageService.ts
            │     │  └─ TaskService.ts
            │     └─ ui/
            │        └─ DomRenderer.ts
            ├─ tsconfig.json
            └─ server/             # Bonus API
               ├─ package.json
               ├─ app.ts
               └─ db.json

🛠️ Stack & outils
  • V1 (Front-only) : HTML, CSS, JavaScript (ES6 modules), LocalStorage.
  • V2 (Migration) : TypeScript, tsc (build vers dist).
  • Bonus API : Node 18+, Express, (optionnel) lowdb ou json-server.
  • Qualité : ESLint, Prettier, EditorConfig.

Plan d’implémentation (semaine du 06 → 10)

Jour 1 — MVP en JS
  • Maquette HTML simple (form + liste).
  • ui.js : capture du formulaire, rendu de la liste (createElement).
  • storage.js : wrapper LocalStorage (load(), save()).
  • main.js : logique (add, remove, toggle, filter).
  • Tests manuels : rechargement conserve les tâches, filtres OK.

Jour 2 — Durcir & nettoyer
  • Validation (titre requis, longueurs).
  • Accessibilité (labels, aria-live pour messages).
  • Messages d’erreur UX.
  • Refactor : passer en modules ES6 + séparation claire UI/logic/storage.
  • Linter + Prettier.

Jour 3 — Migration TypeScript
  • Créer src/ts/ + tsconfig.json avec strict:true.
  • Définir Task, TaskStatus.
  • Refactor JS → TS (services & UI).
  • Compiler vers dist/, vérifier le fonctionnement.

Jour 4 — Améliorations
  • Filtres avancés (recherche par titre).
  • Tri (par date, statut).
  • Export/Import JSON.
  • Tests unitaires légers (si temps) : fonctions pures (TaskService).

Jour 5 — Bonus API + livraison
  • Mini API Express (CRUD mémoire ou lowdb).
  • Adapter le front pour consommer l’API (fetch).
  • README final + CHANGELOG (v1 JS → v2 TS → v3 API).
  • Tag Git v1.0.0.

✅ Critères de validation
  • Fonctionnel : toutes les actions de base marchent + persistance locale.
  • Code : modules clairs, pas de logique UI dans le service métier, commentaires utiles.
  • TypeScript : strict:true, pas de any non justifié, interfaces & types propres.
  • Qualité : ESLint/Prettier, nommages clairs, fonctions pures testables.
  • UX : erreurs gérées, clavier utilisable, feedback visuel minimal.
  • Git : commits atomiques, PR simulée, README & CHANGELOG à jour.

🧪 Idées de tests (manuel + unité)
  • Création avec titre vide → message d’erreur.
  • Toggle d’une tâche → statut mis à jour + updatedAt change.
  • Filtre “done” n’affiche que les tâches faites.
  • Rechargement page → liste identique (LocalStorage).
  • (Unités) TaskService.add/remove/toggle/filter sur un tableau en mémoire.
