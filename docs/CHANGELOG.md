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

## [0.4.0] - 2025-11-14 — Frontend Next.js (S6)

### Added
- Nouveau frontend Next.js dans `web/next/`
- Layout global + navigation
- Page `/tasks` (CSR) avec `TaskForm` et `TaskList`
- Page `/server-time` (SSR)
- Page `/SSG` (SSG + ISR)

### Changed
- Documentation architecture : `ARCHITECTURE_S6.md`
- Ajout de la section Next.js dans `INSTALL.md`

### Notes
- Semaine 7 : API Routes + Authentification

---

## [0.4.1] - 2025-11-27 — Next.js avancé & Auth (S7)

### Added
- API Routes Next.js pour les tâches :
  - `GET /api/tasks` — liste des tâches.
  - `POST /api/tasks` — création d’une tâche.
  - `PUT /api/tasks/:id` — mise à jour d’une tâche.
  - `DELETE /api/tasks/:id` — suppression d’une tâche.
- Module `app/api/tasks/data.ts` avec :
  - type `Task` (id, title, status),
  - stockage en mémoire d’un jeu de tâches de démo,
  - helpers `listTasks`, `createTask`, `updateTask`, `deleteTask`.
- Endpoint d’authentification :
  - `POST /api/auth/login` avec un utilisateur de démo et un token simple.
- `AuthContext` côté front :
  - gestion de `user`, `token`, `isAuthenticated` et `loading`,
  - méthodes `login(email, password)` et `logout()`,
  - persistance de la session dans `localStorage`.
- Page `/login` :
  - formulaire de connexion,
  - messages d’erreur en cas de mauvais identifiants,
  - redirection vers `/tasks` en cas de succès.
- Protection de la page `/tasks` :
  - redirection vers `/login` si l’utilisateur n’est pas connecté,
  - affichage de l’email de l’utilisateur connecté + bouton « Se déconnecter ».
- Documentation d’architecture S7 (`docs/architecture/ARCHITECTURE_S7.md`) détaillant :
  - la structure des API Routes,
  - le fonctionnement de l’auth front/back,
  - les limites actuelles (token pédagogique, stockage en mémoire, etc.).

### Changed
- Page `/tasks` mise à jour pour consommer les API Routes Next.js (`/api/tasks`) via `TasksContext` au lieu de gérer les tâches uniquement en local.
- Organisation des contexts front :
  - `TasksContext` pour la gestion des tâches,
  - `AuthContext` pour la gestion de l’authentification.

### Removed
- Anciennes interactions directes avec un store local pour les tâches (remplacées par les appels à l’API Next).

### Security
- Début de gestion d’authentification (token de démo côté client).
- ⚠️ L’API `/api/tasks` reste accessible sans vérification de token (choix pédagogique pour l’instant).

---

## [0.5.0] - 2025-12-19 — Docker (S9)

### Added
- Environnement de dev Docker Compose (services `api` + `next`)
- Dockerfiles + `.dockerignore` pour le backend et Next.js
- Variables d’environnement `.env.example`
- Documentation Docker : `docs/infra/docker.md`

### Notes
- `docker compose down` supprime les conteneurs (jetables) mais conserve les volumes (sauf `-v`)

---

## [0.6.0] - 2026-01-08 — PostgreSQL + Prisma (S10)

### Added
- Service PostgreSQL (`db`) dans `docker-compose.yml` (Postgres 16) + persistance via volume
- Prisma dans `web/next` (schema + génération du client)
- Migrations Prisma (`init`) + création de la table `"Task"`

### Changed
- API Routes Next (`/api/tasks`, `/api/tasks/[id]`) branchées sur PostgreSQL via Prisma (CRUD)
- Mapping des statuts côté front (`todo/doing/done`) ↔ DB (`TODO/DOING/DONE`) dans `TasksContext`

### Fixed
- Erreur Next App Router : `params` est une Promise → lecture via `await params` dans `/api/tasks/[id]`
- Erreurs Prisma Client liées à la configuration/adapter (génération + connexion Postgres)

### Notes
- La base est accessible via `docker compose exec -it db psql -U taskforge -d taskforge`
- Les endpoints Next sont testables via `curl http://localhost:3000/api/tasks`

---