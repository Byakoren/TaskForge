# 📈 Progression — TaskForge (S1 → S11)

> Suivi hebdomadaire du projet **TaskForge**, développé dans le cadre du Bachelor IABD.  
> Chaque semaine correspond à un jalon technique de montée en compétences, avec un objectif précis, des tests attendus et la documentation à produire ou à mettre à jour.

---

## 🧩 Semaine 1–2 — JavaScript / TypeScript (CRUD LocalStorage)
> 🎯 Objectif : MVP fonctionnel en JS/TS pur, avec persistance locale via `localStorage`.

### Dev
- [x] Créer la structure du projet (`src/`, `public/`)
- [x] Créer une maquette HTML simple (form + liste)
- [x] Implémenter `storage.js` (LocalStorage)
- [ ] Implémenter `ui.js` (rendu DOM, interactions)
- [ ] Implémenter `main.js` (logique CRUD + refresh)
- [ ] Vérifier la persistance après refresh
- [x] Ajouter script `npm run dev` (http-server)

### Tests
- [ ] Parcours manuel complet : add → toggle → delete → refresh
- [ ] Vérifier absence d’erreurs console

### Docs
- ✅ `docs/architecture/ARCHITECTURE_S1-S2.md`
- ✅ `docs/modules/storage.md`
- ✅ `docs/INSTALL_DEV.md`
- ✅ `docs/conventions.md`
- ✅ `docs/glossary.md`
- 📄 `CHANGELOG.md` → compléter section `v0.1.0` 

---

## 🚀 Semaine 3 — API REST (Node / Express)
> 🎯 Objectif : mettre en place un backend minimal avec Express, exposant des routes CRUD `/api/tasks`.

### Dev
- [ ] Initialiser backend Express (`app.js`)
- [ ] Créer routes CRUD `/api/tasks` (GET, POST, PUT, DELETE)
- [ ] Ajouter middlewares (`json()`, `cors`, `errorHandler`)
- [ ] Adapter `storage.js` → appels `fetch()` (asynchrone)

### Tests
- [ ] Thunder Client / Postman (collection CRUD)
- [ ] (Optionnel) Supertest : GET + POST automatisés

### Docs
- 📄 `docs/architecture/ARCHITECTURE_S3.md`
- 📄 `docs/modules/api.md` → créer
- 📄 `README.md` → mention “API Express”
- 📄 `CHANGELOG.md` → ajouter `v0.2.0`

---

## ⚛️ Semaine 4 — React (bases)
> 🎯 Objectif : mise en place du front React (Vite), composants de base et gestion du state.

### Dev
- [ ] Initialiser projet React (Vite)
- [ ] Créer composants : `TaskForm`, `TaskList`, `TaskItem`
- [ ] Gérer le state avec `useState`
- [ ] Intégrer l’API Express (`fetch`)
- [ ] Structurer le dossier `src/components/`

### Tests
- [ ] Test de rendu React Testing Library (affichage liste)
- [ ] Test manuel ajout/suppression de tâches

### Docs
- 📄 `docs/architecture/ARCHITECTURE_S4.md`
- 📄 `docs/conventions.md` → ajouter règles React (composants, hooks)
- 📄 `README.md` → mise à jour “Phase React”
- 📄 `CHANGELOG.md` → `v0.3.0`

---

## ⚛️ Semaine 5 — React (avancé)
> 🎯 Objectif : approfondir React (router, context, effets) et finaliser l’intégration avec l’API.

### Dev
- [ ] Ajouter `react-router-dom` (navigation)
- [ ] Intégrer `Context API` pour le state global
- [ ] Gérer les effets (`useEffect`) pour sync API ↔ UI
- [ ] Optimiser les composants (memoization)

### Tests
- [ ] Tests de navigation (React Router)
- [ ] Test du Context Provider (valeurs globales)

### Docs
- 📄 `docs/architecture/ARCHITECTURE_S5.md`
- 📄 `docs/INSTALL.md` → section “Frontend React”
- 📄 `CHANGELOG.md` → `v0.3.x`
- 📄 `README.md` → mise à jour “React avancé”

---

## 🌐 Semaine 6 — Next.js (bases)
> 🎯 Objectif : migration progressive du front React vers Next.js, avec SSR et structure app.

### Dev
- [ ] Initialiser projet Next.js
- [ ] Pages statiques et dynamiques (`app/`)
- [ ] Découverte SSR / SSG
- [ ] Migration partielle depuis React (réutiliser composants)

### Tests
- [ ] Vérifier SSR / SSG (rendu côté serveur)
- [ ] Snapshot tests (Next pages)

### Docs
- 📄 `docs/architecture/ARCHITECTURE_S6.md`
- 📄 `docs/INSTALL.md` → section “Next.js”
- 📄 `CHANGELOG.md` → `v0.4.0`

---

## 🌐 Semaine 7 — Next.js (avancé)
> 🎯 Objectif : gestion d’authentification et d’API routes dans Next.js.

### Dev
- [ ] Ajouter API Routes (`/api/tasks`)
- [ ] Authentification JWT / LocalStorage
- [ ] Middleware de sécurisation
- [ ] Guard routes (private pages)

### Tests
- [ ] Auth flow complet (login → token → accès)
- [ ] Tests API Routes (unit/int)

### Docs
- 📄 `docs/architecture/ARCHITECTURE_S7.md`
- 📄 `docs/INSTALL.md` → Next.js Auth
- 📄 `CHANGELOG.md` → `v0.4.x`
- 📄 `README.md` → mise à jour Auth

---

## 🎨 Semaine 8 — UI / UX Avancée
> 🎯 Objectif : améliorer l’expérience utilisateur (DnD, filtres, thèmes, accessibilité).

### Dev
- [ ] Drag & Drop (dnd-kit)
- [ ] Filtres / recherche (debounce)
- [ ] Thème clair/sombre (persisté)
- [ ] Accessibilité (focus visible, ARIA)

### Tests
- [ ] Tests manuels DnD + filtres
- [ ] Audit A11y rapide (axe ou lighthouse)

### Docs
- 📄 `docs/architecture/ARCHITECTURE_S8.md`
- 📄 `docs/ui-guidelines.md` → créer
- 📄 `CHANGELOG.md` → `v0.5.0`

---

## 🐳 Semaine 9 — Docker
> 🎯 Objectif : conteneurisation du front et du back pour un environnement de dev isolé.

### Dev
- [ ] `Dockerfile` backend + `.dockerignore`
- [ ] `docker-compose.yml` (API + front)
- [ ] Variables d’environnement (`.env`)

### Tests
- [ ] Build & run local
- [ ] Vérifier endpoints dans conteneurs

### Docs
- 📄 `docs/infra/docker.md` → créer
- 📄 `README.md` → section Docker
- 📄 `CHANGELOG.md` → `v0.6.0`

---

## 🗃️ Semaine 10 — PostgreSQL + Compose
> 🎯 Objectif : mise en place d’une base de données persistante via Docker Compose.

### Dev
- [ ] Intégrer PostgreSQL (Prisma ou Sequelize)
- [ ] Configurer `docker-compose.yml` (API + DB + volumes)
- [ ] Table `tasks` + migrations
- [ ] Adapter routes API

### Tests
- [ ] Tests d’intégration API ↔ DB
- [ ] Vérifier migrations / rollback

### Docs
- 📄 `docs/architecture/ARCHITECTURE_S10.md`
- 📄 `docs/infra/docker.md` → update
- 📄 `CHANGELOG.md` → `v0.7.0`

---

## ☸️ Semaine 11 — Kubernetes
> 🎯 Objectif : déploiement local avec Minikube (pods, services, ingress).

### Dev
- [ ] Manifests `deployment.yaml`, `service.yaml` (front + API)
- [ ] Déploiement local Minikube
- [ ] Vérifier communication entre services

### Tests
- [ ] Vérifier pods/services (`kubectl get all`)
- [ ] Test navigation via NodePort / Ingress

### Docs
- 📄 `docs/infra/k8s.md` → créer
- 📄 `CHANGELOG.md` → `v1.0.0`
- 📄 `README.md` → version finale / déploiement
