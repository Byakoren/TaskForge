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
