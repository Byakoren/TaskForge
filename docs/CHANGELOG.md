# 📝 CHANGELOG — TaskForge
Toutes les modifications importantes de ce projet sont documentées dans ce fichier.
Format inspiré de **Keep a Changelog** et **SemVer**.

- Format de version : `MAJOR.MINOR.PATCH`
- Sections : **Added**, **Changed**, **Fixed**, **Removed**, **Security**

---

## [Unreleased]
### Added
- (à compléter pour v0.2.0 — mise en place de l’API Express)
### Changed
- (à compléter)
### Fixed
- (à compléter)

---

## [0.1.0] - 2025-10-10 — MVP LocalStorage (S1–S2)

### Added
- **Modules créés :**
  - `storage.js` (DAL) — gestion de la persistance locale via LocalStorage
  - `main.js` — logique centrale et orchestration du CRUD complet
  - `ui.js` — rendu 3-colonnes (à faire / en cours / terminé) et interactions utilisateur
- **Documentation :**
  - `docs/modules/storage.md`, `main.md`, `ui.md`
  - `README.md`, `PROGRESSION.md`, `CHANGELOG.md`
  - Ajout de commentaires détaillés dans chaque module
- **Fonctionnalités implémentées :**
  - Ajouter / Renommer / Supprimer une tâche
  - Déplacer entre les statuts `todo`, `doing`, `done`
  - Basculer une tâche terminée (toggle)
  - Persistance complète après rafraîchissement ou redémarrage
- **Tests :**
  - Vérification manuelle complète du CRUD
  - Aucun warning ni erreur console

### Notes
- Première version stable du projet **TaskForge**  
- **Phase couverte :** Semaine 1–2 (MVP LocalStorage)
- **Prochaine étape :** mise en place de l’API Express (Semaine 3)
- Lancement local :
  ```bash
  npm run dev
  ```
  ➜ [http://localhost:8080/public/](http://localhost:8080/public/)

---

## [0.2.0] - 2025-10-17 — API Express (Semaine 3)

### Added
- **Backend Express initialisé :**
  - `app.js` — configuration de l’application Express (CORS, JSON, logs HTTP, routes, erreurs)
  - `server.js` — point d’entrée du serveur
  - `routes/tasks.routes.js` — routes CRUD complètes `/api/tasks`
  - `middlewares/error.js` — gestion des erreurs `notFound` + `errorHandler`
  - Endpoint de santé : `GET /api/health`
- **Documentation associée :**
  - `docs/backend/app.md`
  - `docs/backend/error.md`
  - `docs/backend/tasks.routes.md`
  - `docs/backend/architecture_S3.md`
  - Mise à jour de `PROGRESSION.md`, et `CHANGELOG.md`

### Changed
- Réorganisation des dossiers docs → ajout d’un sous-dossier `backend/` pour clarifier les modules serveur
- Amélioration du style des commentaires en-tête dans les modules

### Fixed
- Aucune anomalie détectée sur la gestion des statuts et des erreurs HTTP

### Notes
- **Version stable du backend Express** (API REST `/api/tasks`)
- Stockage temporaire en **JSON local** (`src/data/tasks.json`)
- **Prochaine étape (S4)** : adaptation du front (`storage.js`) pour consommer l’API via `fetch()`

---

## [0.3.0] - 2025-11-07 — React Integration & API Sync (Semaines 4–5)

### Added
- **Frontend React (Vite + TypeScript)**
  - Migration complète du front vers React.
  - Création des composants : `TaskForm`, `TaskList`, `TaskItem`, `TasksCounter`.
  - Mise en place du **Context API** (`TasksContext.tsx`) pour le state global :
    - `tasks`, `loading`
    - actions : `add`, `toggle`, `remove`, `reload`
  - Intégration du **React Router** (vues `/`, `/todo`, `/done`).
  - Ajout d’un **compteur dynamique** : `X à faire / Y total`.
  - Module `lib/api.ts` : appels REST (GET / POST / PATCH / DELETE) + normalisation `{ data: ... }`.
- **Backend**
  - Nouveau module `utils/store.js` :
    - cache mémoire et écriture asynchrone différée (`flush()`),
    - création automatique du dossier `src/data/`.
  - Refonte complète du routeur `/api/tasks` :
    - CRUD + `PATCH /:id/toggle`
    - format unifié `{ data: ... }`
  - Conversion intégrale du backend en **CommonJS** (`require/module.exports`).
  - Ignorance du fichier `tasks.json` via `nodemon.json` (évite les redémarrages).
  - Ajout des logs HTTP avec `morgan`.

### Changed
- **Architecture générale**
  - Réorganisation des dossiers `frontend/` et `backend/`.
  - Nouveau schéma de communication : React ↔ Express ↔ `tasks.json` (proxy Vite).
  - Uniformisation des formats de réponse API.
  - Documentation enrichie :
    - `ARCHITECTURE_S4-S5.md`
    - `frontend/structure.md`
    - `backend/tasks.routes.md`
    - `README.md`
- **Expérience de développement**
  - Activation du proxy `/api` dans Vite pour éviter CORS.
  - `useRef` ajouté dans `TasksContext` pour prévenir les doubles appels en `StrictMode`.
  - Typage harmonisé : `ID = string | number`.

### Fixed
- Correction du bug `PATCH /toggle` (ID `number` vs `string`).
- Correction de l’affichage du texte vide après toggle.
- Gestion améliorée des erreurs réseau côté front (`try/catch` silencieux).
- Validation renforcée (`title` non vide, `id` positif).

### Notes
- **Version stable de l’intégration React + API.**
- L’application est désormais totalement synchronisée entre le front et le back.  
- Persistance garantie via `store.js` (écriture non bloquante, pas de perte de données).  
- **Prochaine étape (v0.4.0)** : ajout des fonctionnalités avancées (recherche, actions groupées, toasts d’erreur, dark mode).  
- Lancement local :
  ```bash
  # Backend
  cd backend && npm run dev

  # Frontend
  cd frontend && npm run dev
  ➜ http://localhost:5173
  ```

---