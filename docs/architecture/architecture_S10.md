# ARCHITECTURE — Semaine 10 (PostgreSQL + Docker Compose)

> Portée : ajout d’une base de données PostgreSQL persistante et intégration dans Docker Compose.  
> Objectif : remplacer le stockage JSON/mémoire par une base SQL et connecter l’API **Next.js** via Prisma.

---

## 1) Contexte

Jusqu’ici, les tâches étaient stockées en mémoire / JSON (mock) et servies par des routes API.
Cette semaine introduit une **base PostgreSQL** pour rendre les données **persistantes**, et un **ORM (Prisma)** pour accéder à la DB avec un typage TypeScript et des migrations.

---

## 2) Architecture cible

### Services Docker Compose

- `next` : Next.js en mode dev (front + API Routes)
- `db` : PostgreSQL 16 (données persistées via volume)
- `api` : (optionnel) backend Express legacy (non utilisé pour l’API principale)

### Schéma d’échanges

- Le **front** (pages `/tasks`) appelle l’API locale : `GET/POST /api/tasks`, `GET/PUT/DELETE /api/tasks/:id`
- Les **API Routes Next** exécutent les requêtes via **Prisma Client**
- Prisma se connecte à **PostgreSQL** via le service Docker `db:5432`

---

## 3) Composants et responsabilités

### A) Front (Next — Client Components)
- Affichage Kanban des tâches (todo/doing/done)
- Actions utilisateur :
  - créer une tâche
  - modifier le titre
  - changer le statut (boutons + drag & drop)
  - supprimer une tâche
- Communication via `fetch()` vers `/api/tasks...`

### B) API (Next — Route Handlers)
Routes principales :

- `app/api/tasks/route.ts`
  - `GET` : liste des tâches
  - `POST` : création d’une tâche

- `app/api/tasks/[id]/route.ts`
  - `GET` : lecture d’une tâche
  - `PUT` : mise à jour (titre / status)
  - `DELETE` : suppression

Règles :
- validation basique (`title` non vide, `status` parmi TODO/DOING/DONE)
- réponses JSON + codes HTTP cohérents

### C) Data Access Layer (Prisma)
- `prisma/schema.prisma` : source de vérité du modèle de données
- `PrismaClient` : accès DB typé dans les routes API
- migrations : versionnement de la structure DB

### D) Base de données (PostgreSQL)
- stockage persistant via volume
- table principale : `"Task"`
- table technique Prisma : `_prisma_migrations`

---

## 4) Modèle de données (Task)

### Statuts
- DB : `TODO | DOING | DONE`
- UI : `todo | doing | done`

Un mapping est appliqué côté front pour garder une UX simple tout en conservant un enum strict en base.

### Champs (exemple)
- `id` (UUID)
- `title` (string)
- `status` (enum)
- `createdAt` (datetime)
- `updatedAt` (datetime)

---

## 5) Flux principaux

### 5.1 — Charger les tâches
1. `TasksContext` → `fetch("/api/tasks")`
2. Next API → `prisma.task.findMany()`
3. PostgreSQL renvoie les lignes
4. Front mappe `TODO/DOING/DONE` → `todo/doing/done` + calcule `done`

### 5.2 — Créer une tâche
1. Front `POST /api/tasks` `{ title }`
2. Next API valide `title`
3. Prisma `create({ title, status: TODO })`
4. Retour JSON (task créée)

### 5.3 — Changer un statut (drag/drop)
1. Front `PUT /api/tasks/:id` `{ status: "doing" }` (UI)
2. Mapping UI→DB : `doing` → `DOING`
3. Prisma `update({ where: {id}, data: {status} })`
4. Front met à jour l’état

---

## 6) Points d’attention / incidents rencontrés

### A) Next App Router — params async
Sur les routes dynamiques (`/api/tasks/[id]`), `params` peut être une **Promise**.
Correction : déstructurer via `await params` avant `params.id`, sinon `id` passe à `undefined` et Prisma échoue.

### B) Prisma v7 — adapter requis
La version Prisma utilisée impose un adapter pour la connexion Postgres.
Dépendances : `pg` + `@prisma/adapter-pg`.

### C) Réponse HTML au lieu de JSON en cas d’erreur
Lors d’un crash API (500), `curl` reçoit une page HTML Next.
Solution : diagnostiquer via `docker compose logs -f next` et corriger la route fautive.

---

## 7) Vérifications / tests manuels

- API :
  - `GET /api/tasks` renvoie une liste JSON
  - `POST /api/tasks` crée une tâche
  - `GET /api/tasks/:id` renvoie une tâche
  - `PUT /api/tasks/:id` met à jour le titre / status
  - `DELETE /api/tasks/:id` supprime une tâche

- DB :
  - `SELECT * FROM "Task";` affiche les données persistées

---
