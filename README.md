# 🚀 TaskForge

TaskForge est un **gestionnaire de tâches évolutif** développé comme projet fil rouge.  
L’objectif n’est pas seulement d’écrire du code : c’est de construire **une vraie application utilisable**, puis de la faire progresser étape par étape (front → API → base de données → déploiement).  

Stack cible : **JavaScript / TypeScript / React / Next.js / Node.js / Docker / PostgreSQL / Kubernetes**.

---

## 🎯 À quoi sert TaskForge ?

TaskForge permet à un utilisateur de **capturer, organiser et suivre** ses tâches au quotidien.  
À terme, l’application doit offrir :

- **CRUD complet de tâches** (créer, lire, modifier, supprimer)
- **Statut** (à faire, en cours, fait) avec **toggle rapide**
- **Tri & filtres** (par statut, par date, par texte)
- **Recherche instantanée**
- **Réorganisation par *drag & drop*** (changer la priorité)
- **Thème clair/sombre** et **UI responsive**
- **Persistance** : d’abord **LocalStorage** (offline-first), puis **API Express** et **PostgreSQL**
- Auth légère (JWT / sessions) pour isoler les données par utilisateur

👉 Côté technique, TaskForge démontre :

- la montée en compétence **JS → TS**
- un **frontend moderne** (JS pur → React → Next.js, SSR/SSG)
- une **API REST** Express propre (middlewares, gestion d’erreurs)
- une **persistance** réelle (PostgreSQL)
- la **conteneurisation & déploiement** (Docker, Kubernetes)

---

## ✨ Fonctionnalités (MVP)

État du MVP visé :

- [x] Ajouter / éditer / supprimer une tâche
- [x] Marquer une tâche comme terminée
- [ ] Filtrer par statut (+ recherche par texte)
- [ ] Réordonner les tâches (drag & drop)
- [x] Persistance locale (LocalStorage) puis via API (en mémoire pour l’instant)
- [ ] Interface accessible & responsive (version finale)
- [ ] Thème clair/sombre

### 🔐 Auth actuelle (S6–S7)

- [x] Page de **login** (`/login`) avec utilisateur de démo
- [x] **API Routes** d’auth Next.js (`/api/auth/login`, etc.)
- [x] Stockage de la session côté client (localStorage)
- [x] **Page protégée** `/tasks` (redirection automatique vers `/login` si non connecté)
- [x] Bouton **logout** qui nettoie la session

Cette auth est volontairement simple (fake user + token stocké côté client) et sera durcie plus tard (JWT réel + base PostgreSQL).

### 🔭 Extensions prévues (nice-to-have)

- [ ] Auth avancée (JWT, refresh token, rôles)
- [ ] Catégories / projets / étiquettes
- [ ] Export JSON / CSV
- [ ] Raccourcis clavier (ajout rapide, recherche)

---

## 🧱 Architecture (vue d’ensemble)

Architecture cible du dépôt :

```txt
taskforge/
├─ web/
│  ├─ src/                  # Front historique JS/TS + React (S1–S5)
│  └─ next/                 # Front Next.js (App Router) + Auth (S6–S7)
│     ├─ app/
│     │  ├─ page.tsx        # Accueil
│     │  ├─ tasks/          # Page protégée de gestion des tâches
│     │  ├─ login/          # Page de connexion
│     │  └─ api/
│     │     ├─ tasks/       # API Routes CRUD /api/tasks
│     │     └─ auth/        # API Routes d’auth /api/auth/*
│     ├─ components/        # UI réutilisable (TaskForm, TaskList, etc.)
│     ├─ context/           # AuthContext, TasksContext
│     ├─ types/             # Types TypeScript partagés
│     └─ public/            # Assets Next.js
├─ backend/                 # API Express (S3+, à venir)
│  ├─ src/
│  │  ├─ routes/            # routes REST (/tasks)
│  │  ├─ controllers/       # logique métier
│  │  ├─ middlewares/       # auth, erreurs, logs
│  │  └─ db/                # accès Postgres / ORM
│  └─ tests/                # tests d’API
├─ infra/
│  ├─ docker/               # Dockerfile, docker-compose.yml
│  └─ k8s/                  # manifests Kubernetes (deployment, service)
└─ docs/
   ├─ PROGRESSION.md        # plan détaillé S1 → S11
   ├─ architecture/         # docs d’architecture par semaine
   └─ ...                   # install, glossaire, etc.
```

---

## 🛠️ Stack technique

- **Frontend**  
  - JS / TS vanilla (S1–S2)  
  - React (S4–S5)  
  - **Next.js (App Router) + TypeScript + TailwindCSS** (S6–S7)
- **Backend** : Node.js (Express) — à partir de la S3
- **Base de données** : PostgreSQL (via Docker Compose, S10)
- **Infrastructure** : Docker, Kubernetes (Minikube, S9–S11)
- **Qualité & DX** : ESLint, Prettier, (CI GitHub Actions plus tard)

---

## ▶️ Installation & lancement rapide

> Prérequis : **Node 18+** et **npm**.  
> (Docker & Minikube seront utilisés plus tard pour la partie DevOps.)

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/Byakoren/TaskForge.git
cd TaskForge
```

### 2️⃣ Lancer le front Next.js (version actuelle avec Auth)

```bash
cd web/next
npm install

# Lancer le serveur Next.js (http://localhost:3000)
npm run dev
```

- Page de login : `http://localhost:3000/login`  
- Page des tâches (protégée) : `http://localhost:3000/tasks`

Scripts utiles (dans `web/next`) :

```bash
npm run dev      # dev server Next.js
npm run build    # build de production Next.js
npm run start    # serveur Next.js en mode prod (après build)
npm run lint     # ESLint sur le code Next
npm run format   # Prettier sur le code Next
```

### 3️⃣ (Option) Lancer le MVP LocalStorage (S1–S2)

Si besoin de montrer la toute première version en JS/TS pur :

```bash
# À la racine du projet (là où se trouve package.json du MVP)
npm install
npm run dev      # sert /public/ via http-server (port 8080 en général)
```

---

## 🖼️ Aperçu du MVP (Semaine 1–2)

Exemple d’interface TaskForge après la mise en place du CRUD LocalStorage :

![TaskForge – MVP LocalStorage](./docs/assets/mvp-localstorage.png)

---

## 📌 Roadmap globale (11 semaines)

1. **Semaine 1–2 — JS / TS (CRUD LocalStorage)**  
   Maquette HTML/JS/TS avec CRUD local (LocalStorage).  

2. **Semaine 3 — API REST (Node / Express)**  
   Mise en place du backend Express, routes CRUD `/tasks`, tests Postman.

3. **Semaine 4 — React (bases)**  
   Front React TypeScript, composants de base, gestion du state.

4. **Semaine 5 — React (avancé)**  
   Context API, router, effets, intégration complète avec l’API.

5. **Semaine 6 — Next.js (bases)**  
   Migration partielle du front vers Next.js, SSR/SSG, structure `app/`.

6. **Semaine 7 — Next.js (avancé / Auth)**  
   API Routes `/api/tasks`, auth légère, protection de la page `/tasks`.

7. **Semaine 8 — UI/UX & fonctionnalités avancées**  
   Drag & drop, filtres, transitions, thème clair/sombre, accessibilité.

8. **Semaine 9 — Docker (bases)**  
   Dockerisation du front et du back.

9. **Semaine 10 — PostgreSQL + Docker Compose**  
   Schéma `tasks`, migrations, CRUD complet connecté à la DB.

10. **Semaine 11 — Kubernetes (bases)**  
    Déploiement sur Minikube avec `deployment.yaml` et `service.yaml`.

---

## 📚 Documentation & suivi

- **Progression détaillée** (S1 → S11) : [PROGRESSION.md](./PROGRESSION.md)  
- **Architecture par étape** : `docs/architecture/`  
- **Conventions & glossaire** : `docs/conventions.md`, `docs/glossary.md`  

---

## 🤝 Contributions

Le projet est pédagogique mais toute suggestion d’amélioration est la bienvenue (issues, PR).  
Style de code : **TypeScript strict**, ESLint + Prettier, *commits* clairs (Conventional Commits).

---

## 📄 Licence

MIT — usage libre à des fins d’apprentissage et de démonstration.
