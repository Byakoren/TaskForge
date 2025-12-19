# Docker (Semaine 9)

Ce projet peut être lancé en **développement** via **Docker Compose** (API + Next.js), avec **hot reload**.

## Prérequis
- Docker Desktop
- (Windows) WSL2 + intégration Docker Desktop activée pour Ubuntu

## Démarrage rapide

Depuis la **racine du repo** :

```bash
cp .env.example .env
docker compose up --build
```

- Front (Next) : http://localhost:3000
- API : http://localhost:3001

> Arrêt : `Ctrl + C`  
> Nettoyage : `docker compose down` (supprime les conteneurs, garde les volumes sauf `-v`)

## Commandes utiles

```bash
docker compose ps
docker compose logs -f --tail=200
docker compose restart api
docker compose restart next
docker compose down
```

## Vérifier la communication entre conteneurs

L’API est accessible depuis le conteneur Next via le nom DNS `api` :

```bash
docker compose exec next sh -lc "wget -qO- http://api:3001/api/tasks"
```

Si la commande renvoie du JSON, le réseau interne Compose fonctionne.

## Notes (pour comprendre le setup)

- Les services `api` et `next` tournent dans des **conteneurs**.
- Le code est monté en **volumes** (`./backend:/app`, `./web/next:/app`) :
  - tes modifications de code sont visibles immédiatement dans le conteneur
  - `nodemon` (API) et `next dev` (front) gèrent le reload
- `docker compose down` supprime les conteneurs “jetables”. Pour supprimer aussi les volumes :
  ```bash
  docker compose down -v
  ```

## Dépannage rapide

- **Ports déjà pris** (3000/3001) : change `NEXT_PORT` / `API_PORT` dans `.env`, puis relance.
- **Docker introuvable dans Ubuntu WSL** : vérifier Docker Desktop → *Settings* → *Resources* → *WSL Integration*.
