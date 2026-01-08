# Docker (Semaine 9–10)

Le projet se lance en **développement** via **Docker Compose** avec :
- **Next.js** (`web/next`) → front + **API Routes** (`/api/...`)
- **PostgreSQL** (`db`) → base de données persistante
- (optionnel) **API Express legacy** (`backend`) sur `:3001` si tu la gardes

✅ Hot reload via volumes.

---

## Prérequis
- Docker Desktop
- (Windows) WSL2 + intégration Docker Desktop activée pour Ubuntu

---

## Démarrage rapide

Depuis la **racine du repo** :

~~~bash
cp .env.example .env
docker compose up --build
~~~

- App (Next) : http://localhost:3000
- API Next : http://localhost:3000/api/tasks
- PostgreSQL : localhost:5432 (exposé pour outils externes)
- (optionnel) API Express : http://localhost:3001

> Arrêt : `Ctrl + C`  
> Nettoyage : `docker compose down` (supprime les conteneurs, garde les volumes sauf `-v`)

---

## Services (compose)

- `next` : Next.js en mode dev (front + API Routes)
- `db` : PostgreSQL 16 + volume de données
- `api` : (optionnel) backend Express legacy sur `:3001`

---

## Commandes utiles

~~~bash
docker compose ps
docker compose logs -f --tail=200 next
docker compose logs -f --tail=200 db

docker compose restart next
docker compose restart db

docker compose down
~~~

---

## Prisma (migrations & génération)

Prisma est installé dans `web/next` et s’exécute **dans le conteneur `next`**.

~~~bash
# Générer le client Prisma
docker compose exec next npx prisma generate

# Lancer une migration (ex: init)
docker compose exec next npx prisma migrate dev --name init

# Voir le status des migrations
docker compose exec next npx prisma migrate status
~~~

> Note : Prisma v7 (dans ce projet) utilise un **adapter Postgres**.
> Si tu vois une erreur du type "adapter required", vérifie que ces dépendances sont installées dans `web/next` :
~~~bash
docker compose exec next npm i pg @prisma/adapter-pg
~~~

---

## Vérifier que l’API Next répond

~~~bash
curl -s http://localhost:3000/api/tasks
echo
~~~

Créer une tâche :

~~~bash
curl -s -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Task via curl"}'
echo
~~~

---

## Vérifier la DB (psql)

Ouvrir `psql` dans le conteneur :

~~~bash
docker compose exec -it db psql -U taskforge -d taskforge
~~~

Commandes utiles dans `psql` :

~~~sql
\dt
SELECT id, title, status, "createdAt", "updatedAt"
FROM "Task"
ORDER BY "createdAt" DESC;
~~~

Affichage vertical (pratique pour UUID) :

~~~sql
\x on
SELECT * FROM "Task" ORDER BY "createdAt" DESC;
\x off
~~~

Quitter :

~~~sql
\q
~~~

---

## Notes (pour comprendre le setup)

- `next` et `db` tournent dans des **conteneurs**.
- Le code Next est monté en volume (`./web/next:/app`) :
  - tes modifications sont visibles immédiatement
  - `next dev` gère le reload
- `db` utilise un volume Docker pour persister les données.
- Pour supprimer aussi les volumes (⚠️ supprime la DB) :

~~~bash
docker compose down -v
~~~

---

## Dépannage rapide

- **Ports déjà pris** (3000/5432) : change `NEXT_PORT` (et/ou le mapping DB) puis relance.
- **Docker introuvable dans Ubuntu WSL** : Docker Desktop → *Settings* → *Resources* → *WSL Integration*.
- **DB pas prête** : vérifier la santé de Postgres :

~~~bash
docker compose exec db pg_isready -U taskforge -d taskforge
~~~
