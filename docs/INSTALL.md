# 🧰 Installation & lancement complet (version finale)

> **Prérequis :**
> - Node.js **v18+**
> - npm (inclus avec Node)
> - Docker Desktop ou équivalent (pour la suite du projet)
> - Minikube (optionnel, pour Kubernetes)
>
> 🧠 *Ce guide décrit la cible “full-stack” du projet TaskForge. Aujourd’hui seul le frontend Next.js (S6–S7) est réellement en place ; le backend Express / PostgreSQL et la partie Docker/Kubernetes seront ajoutés dans les semaines suivantes.*

---

## 🧱 Cloner et installer

```bash
# 1️⃣ Cloner le dépôt
git clone https://github.com/Byakoren/TaskForge.git
cd TaskForge
```

### Frontend Next.js (S6–S7)

```bash
cd web/next
npm install
```

> Le frontend Next.js est actuellement la partie principale du projet (Auth + page `/tasks`).  
> Toutes les commandes `npm run dev`, `npm run build`, etc. suivantes sont à exécuter dans `web/next`.

### Backend Express (plus tard)

Quand le backend sera en place (S3+), il vivra dans `backend/` :

```bash
cd backend
npm install
```

---

## 🚀 Lancer en mode développement

### Frontend Next.js

```bash
cd web/next
npm run dev
```

- Frontend (Next.js) : **http://localhost:3000**
  - Page de login : `http://localhost:3000/login`
  - Page des tâches (protégée) : `http://localhost:3000/tasks`

### Backend Express (prévu)

Quand le backend sera implémenté (S3+), le lancement ressemblera à :

```bash
cd backend
npm run dev
```

- API Express : **http://localhost:4000/api/tasks**

> Pour l’instant, les routes d’API sont gérées directement par **Next.js** via les **API Routes** (`/api/tasks`, `/api/auth/login`, etc.).

---

## 🐳 Lancer via Docker (stack complète – à venir)

> Cette partie sera réellement utile à partir des semaines 9–10 (Docker + PostgreSQL).  
> Les commandes ci-dessous décrivent la cible attendue du projet.

```bash
# Build et démarrage des conteneurs
docker-compose up --build

# Optionnel : exécuter en arrière-plan
docker-compose up -d
```

Services prévus :

- `frontend` → http://localhost:3000  
- `backend` → http://localhost:4000  
- `db` (PostgreSQL) → port 5432  

---

## ☸️ Déploiement Kubernetes (Minikube – cible)

```bash
# Démarrer Minikube
minikube start

# Appliquer les manifests
kubectl apply -f k8s/
```

> ⚙️ Les fichiers `deployment.yaml` et `service.yaml` gèreront la mise en place des pods pour le frontend, le backend et la base de données.

---

## 🧪 Scripts typiques (côté frontend Next.js)

À lancer dans `web/next` :

```bash
npm run dev       # mode dev (Next.js + API Routes)
npm run build     # build de production Next.js
npm run start     # serveur Next.js en mode production (après build)
npm run lint      # vérifie le code avec ESLint
npm run format    # formatte le code avec Prettier
```

Côté backend (quand il sera présent) :

```bash
npm run dev       # serveur Express en mode dev
npm run build     # build TypeScript → JS (si applicable)
npm start         # serveur Express en prod
npm test          # tests d'API
```

---

## 💾 Données & persistance (cible)

- **Aujourd’hui (S6–S7)** :
  - les tâches sont stockées **en mémoire** dans `web/next/app/api/tasks/data.ts`,
  - l’auth utilise un **utilisateur de démo** côté serveur.

- **Cible (S10)** :
  - base PostgreSQL configurée dans `docker-compose.yml`,
  - migrations gérées via Prisma / Sequelize,
  - volumes Docker pour la persistance des données entre builds.

---

## 🔧 Qualité & CI/CD (cible)

- **ESLint** + **Prettier** (déjà utilisés côté Next.js)
- Husky (hooks pre-commit) — à venir
- **GitHub Actions** pour lint + tests automatiques
- Build Docker automatisé à chaque push sur `main`

---

## 🧹 Nettoyer (Docker)

```bash
# Arrêter les conteneurs
docker-compose down

# Supprimer les volumes si besoin
docker-compose down -v
```

---

# Installation du frontend Next.js (Semaine 6+)

Ce frontend **Next.js** (dossier `web/next`) remplace progressivement l'ancien front React (S4–S5, dossier `web/src`).

## Installation rapide

```bash
cd web/next
npm install
npm run dev
# http://localhost:3000
```

## Scripts disponibles (rappel)

- `npm run dev` — mode développement
- `npm run build` — build production
- `npm start` — serveur production (après build)
- `npm run lint` — lint TypeScript/React avec ESLint
- `npm run format` — formatage automatique avec Prettier

## Technologies utilisées

- Next.js (App Router)
- API Routes (`/api/tasks`, `/api/auth/login`, ...)
- SSR / SSG / ISR
- Client Components
- TailwindCSS v4
- TypeScript strict
