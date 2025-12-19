# ARCHITECTURE — Semaine 9 (Docker)

## 1. Objectif

Conteneuriser le **front (Next)** et le **back (API Node)** pour obtenir un environnement de dev :
- isolé (mêmes versions/outils partout),
- reproductible (un `docker compose up` suffit),
- compatible hot-reload (Next + nodemon via volumes).

⚠️ Semaine 9 : pas de BDD. (PostgreSQL + volumes + migrations = Semaine 10)

---

## 2. Changements vs Semaine 8

Aucun changement majeur côté code fonctionnel (pages/components/API Routes).
On ajoute uniquement une couche **infra/dev** :

- `docker-compose.yml` (orchestration des services)
- `backend/Dockerfile` + `backend/.dockerignore`
- `web/next/Dockerfile` + `web/next/.dockerignore`
- `.env.example` (variables d’environnement)
- `docs/infra/docker.md` (doc de lancement)

---

## 3. Structure liée à S9

À la racine du repo :

    docker-compose.yml
    .env.example
    docs/
      infra/
        docker.md

Dans les apps :

    backend/
      Dockerfile
      .dockerignore
      ...

    web/next/
      Dockerfile
      .dockerignore
      ...

---

## 4. Services Docker Compose

Fichier : `docker-compose.yml`

### 4.1 Service `api`
- Build depuis `./backend`
- Expose `3001` vers l’hôte : `http://localhost:3001`
- Lance `npm run dev` (nodemon)
- Volume code : `./backend:/app`
- Volume dédié : `api_node_modules:/app/node_modules` (évite d’écraser les deps)

### 4.2 Service `next`
- Build depuis `./web/next`
- Expose `3000` vers l’hôte : `http://localhost:3000`
- Lance Next en dev avec `--hostname 0.0.0.0` (écoute en container)
- Volume code : `./web/next:/app`
- Volumes dédiés :
  - `next_node_modules:/app/node_modules`
  - `next_cache:/app/.next`
- Dépend de `api` (startup order)

---

## 5. Réseau & URLs (host vs container)

Docker Compose crée un réseau interne où chaque service est joignable par son nom :

- depuis `next` → API via `http://api:3001` (DNS interne Compose)
- depuis le navigateur (host) → API via `http://localhost:3001`

Variables conseillées :
- `NEXT_PUBLIC_API_URL=http://localhost:3001` (client-side)
- `API_INTERNAL_URL=http://api:3001` (server-side / inter-container)

---

## 6. Hot reload (dev)

Le hot-reload fonctionne grâce aux volumes :
- le code local est monté dans le conteneur (`/app`)
- `nodemon` redémarre l’API au changement
- `next dev` recharge le front

---

## 7. Commandes de base

Depuis la racine :

    cp .env.example .env
    docker compose up --build

Arrêter :
- `Ctrl + C` (stop)
- `docker compose down` (supprime les conteneurs, garde les volumes sauf `-v`)

---

## 8. Limites actuelles

- Pas de base de données (store en mémoire comme S7/S8)
- Setup orienté **dev** (pas encore un Dockerfile “prod” optimisé)

Évolution Semaine 10 :
- ajout PostgreSQL dans `docker-compose.yml`
- persistance des données via volumes
- migrations / seed
