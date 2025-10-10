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
