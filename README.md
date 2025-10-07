# 🚀 TaskForge

TaskForge est un **gestionnaire de tâches évolutif** développé comme projet fil rouge. L’objectif n’est pas seulement d’écrire du code : c’est de construire **une vraie application utilisable**, puis de la faire progresser étape par étape (front → API → base de données → déploiement).  
Stack cible : **JavaScript / TypeScript / React / Next.js / Node.js / Docker / PostgreSQL / Kubernetes**.

---

## 🎯 À quoi sert TaskForge ?

TaskForge permet à un utilisateur de **capturer, organiser et suivre** ses tâches au quotidien.  
À terme, l’application doit offrir :
- **CRUD complet de tâches** (créer, lire, modifier, supprimer).
- **Statut** (à faire, en cours, fait) avec **toggle rapide**.
- **Tri & filtres** (par statut, par date, par texte).
- **Recherche instantanée**.
- **Réorganisation par *drag & drop*** (ex. changer la priorité).
- **Thème clair/sombre** et **UI responsive**.
- **Persistance** : d’abord **LocalStorage** (offline‑first), puis **API Express** et **PostgreSQL**.
- (Plus tard) **auth légère** (JWT/localStorage) pour isoler les données par utilisateur.

👉 Côté technique, TaskForge démontre :
- la montée en compétence **JS → TS**,
- un **frontend moderne** (React puis Next.js, SSR/SSG),
- une **API REST** Express propre (middlewares, gestion d’erreurs),
- une **persistance** réelle (PostgreSQL),
- la **conteneurisation & déploiement** (Docker, Kubernetes).

---

## ✨ Fonctionnalités (MVP)

- [ ] Ajouter / éditer / supprimer une tâche
- [ ] Marquer une tâche comme terminée
- [ ] Filtrer par statut (+ recherche par texte)
- [ ] Réordonner les tâches (drag & drop)
- [ ] Persistance locale (LocalStorage), puis API
- [ ] Interface accessible & responsive
- [ ] Thème clair/sombre

### 🔭 Extensions prévues (nice‑to‑have)
- [ ] Auth légère (JWT) et sessions
- [ ] Catégories / projets / étiquettes
- [ ] Export JSON
- [ ] Raccourcis clavier (ajout rapide, recherche)

---

## 🧱 Architecture (vue d’ensemble)

```
taskforge/
├─ frontend/            # React / Next.js (TypeScript)
│  ├─ app/              # (Next.js) routes/pages
│  ├─ components/       # UI réutilisable
│  ├─ lib/              # helpers (fetch, utils)
│  └─ styles/           # Tailwind / CSS
├─ backend/             # Node.js / Express (TypeScript possible)
│  ├─ src/
│  │  ├─ routes/        # routes REST (/tasks)
│  │  ├─ controllers/   # logique métier
│  │  ├─ middlewares/   # auth, erreurs, logs
│  │  └─ db/            # accès Postgres / Prisma/Sequelize
│  └─ tests/            # tests d’API
├─ infra/
│  ├─ docker/           # Dockerfile, docker-compose.yml
│  └─ k8s/              # manifests Kubernetes (deployment, service)
└─ docs/
   └─ api.md            # endpoints & exemples de requêtes
```

---

## 🛠️ Stack technique

- **Frontend** : React, Next.js, TypeScript, TailwindCSS  
- **Backend** : Node.js (Express)  
- **Base de données** : PostgreSQL (via Docker Compose)  
- **Infrastructure** : Docker, Kubernetes (Minikube)  
- **Qualité & DX** : ESLint, Prettier, Husky (pré‑commit), GitHub Actions (CI plus tard)

---

## ▶️ Installation & lancement rapide

> Prérequis : **Node 18+** et **npm**.  
> (Docker & Minikube uniquement pour les étapes DevOps ultérieures)

```bash
# 1️⃣ Cloner le dépôt
git clone https://github.com/Byakoren/TaskForge.git
cd TaskForge

# 2️⃣ Installer les dépendances du projet
npm install

# 3️⃣ Lancer le serveur de développement
npm start

```

Scripts à venir (non encore actifs)
```bash
npm run dev       # mode développement (React/Next.js à venir)
npm run build     # build de production
npm run lint      # vérifie le code avec ESLint
npm test          # lance les tests unitaires (futur)

```

---

## 📌 Roadmap globale (11 semaines)

1. **Semaine 1-2 — JS / TS (CRUD LocalStorage)**  
   Création d’une maquette HTML/JS/TS avec CRUD local (LocalStorage).  
   Apprentissage des bases JS/TS via les MOOCs, puis mise en pratique directe.

2. **Semaine 3 — API REST (Node / Express)**  
   Mise en place du backend Express, création des routes CRUD `/tasks`, gestion des erreurs, tests Postman.

3. **Semaine 4 — React (bases)**  
   Création du front React TypeScript, composants de base, gestion du state et intégration API.

4. **Semaine 5 — React (avancé)**  
   Context API, router, effets, intégration complète avec l’API.

5. **Semaine 6 — Next.js (bases)**  
   Migration du front React → Next.js, SSR/SSG, structure app.

6. **Semaine 7 — Next.js (avancé)**  
   API routes, authentification JWT/localStorage, middleware et sécurisation.

7. **Semaine 8 — UI/UX & fonctionnalités avancées**  
   Drag & drop, filtres, transitions, thème clair/sombre, design Tailwind.

8. **Semaine 9 — Docker (bases)**  
   Création Dockerfile, .dockerignore, build, run, tests en local.

9. **Semaine 10 — PostgreSQL + Docker Compose**  
   Ajout d’une base PostgreSQL persistante, schéma `tasks`, migrations, CRUD complet.

10. **Semaine 11 — Kubernetes (bases)**  
    Déploiement sur Minikube avec `deployment.yaml` et `service.yaml`.

---

## 📚 Documentation & suivi

- **Progression détaillée** (objectifs S1 → S11) : voir [PROGRESSION.md](./PROGRESSION.md)  
- **API & endpoints** (pas encore dispo) : `docs/api.md`  


---

## 🤝 Contributions

Le projet est pédagogique mais toute suggestion d’amélioration est la bienvenue (issues, PR).  
Style de code : **TypeScript strict**, ESLint + Prettier, *commits* clairs.

---

## 📄 Licence

MIT — usage libre à des fins d’apprentissage et de démonstration.
