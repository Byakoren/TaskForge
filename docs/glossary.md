# 📚 Glossaire — TaskForge

> Ce document centralise les principaux termes et acronymes utilisés dans le projet TaskForge.  
> Il facilite la compréhension du code, de la documentation et des échanges techniques tout au long des 11 semaines de développement.

---

## A

### API (Application Programming Interface)
Interface permettant à deux systèmes logiciels de communiquer entre eux.  
Dans TaskForge, l’API Express expose les routes `/api/tasks` utilisées par le front pour gérer les tâches.

### Architecture
Organisation logique du code (frontend, backend, data, infra).  
Le projet évolue d’une architecture **monolithique front** (S1–S2) vers une **architecture full‑stack** (S3+).

---

## C

### CI/CD (Continuous Integration / Continuous Deployment)
Processus automatisés de build, test et déploiement (prévu S9–S11).  
Ils garantissent la qualité du code et la régularité des déploiements via GitHub Actions.

### CRUD (Create, Read, Update, Delete)
Opérations de base sur les données.  
TaskForge implémente un CRUD complet pour les tâches.

### Context API
Mécanisme React pour partager un état global entre composants sans passer par des props (introduit en S5).

---

## D

### DAL (Data Access Layer)
Couche d’accès aux données : abstraction permettant au code applicatif d’interagir avec la base ou le stockage local sans dépendre de la technologie utilisée.  
Dans TaskForge, `storage.js` joue ce rôle (LocalStorage → API → PostgreSQL).

### Docker
Outil de conteneurisation pour exécuter des applications dans un environnement isolé.  
Utilisé à partir de la S9 pour empaqueter le front, le back et la base.

---

## E

### ESLint
Outil d’analyse statique qui détecte les erreurs et incohérences dans le code JavaScript/TypeScript.  
Couplé à **Prettier** pour maintenir un style uniforme.

---

## F

### Frontend
Partie visible de l’application (UI).  
TaskForge démarre en JavaScript pur (S1–S2), migre vers React (S4–S5), puis Next.js (S6–S7).

---

## G

### GitHub Flow
Workflow Git simplifié basé sur des branches courtes et des merges via Pull Requests.  
Adopté pour TaskForge afin de garder un historique propre et linéaire.

---

## J

### JSON (JavaScript Object Notation)
Format léger d’échange de données entre le front et le back.  
TaskForge stocke temporairement ses tâches dans un fichier `tasks.json` côté API avant la migration PostgreSQL.

---

## L

### LocalStorage
API du navigateur permettant de stocker des données localement.  
C’est la première méthode de persistance du projet (S1–S2).

---

## M

### Minikube
Outil permettant de déployer un cluster Kubernetes local pour les tests de déploiement (S11).

### MVP (Minimum Viable Product)
Version minimale d’un produit qui contient juste les fonctionnalités essentielles.  
Ici : CRUD de tâches en LocalStorage + persistance.

---

## N

### Next.js
Framework basé sur React ajoutant le rendu côté serveur (SSR) et la génération statique (SSG).  
Intégré en S6–S7.

### Node.js
Environnement d’exécution JavaScript côté serveur.  
TaskForge utilise Node.js pour son backend Express (S3+).

---

## P

### PostgreSQL
Base de données relationnelle utilisée à partir de la S10 via Docker Compose.  
Elle remplace le stockage JSON.


### PR (Pull Request)
Demande de fusion d’une branche dans `main`. Permet la relecture et la validation du code avant merge.

---

## S

### SemVer (Semantic Versioning)
Convention de versionnage basée sur trois nombres : `MAJOR.MINOR.PATCH`.  
Exemple : `0.1.0` = MVP LocalStorage.

### SSR / SSG (Server-Side Rendering / Static Site Generation)
Techniques de rendu côté serveur dans Next.js (S6–S7).  
Permettent d’améliorer les performances et le SEO.

### Storage
Désigne la couche de persistance des données.  
Dans TaskForge, le module `storage.js` sert de point d’accès unique à la donnée.

---

## T

### TaskForge
Nom du projet fil rouge.  
Gestionnaire de tâches évolutif servant de support de formation full‑stack.

### TypeScript
Surcouche de JavaScript ajoutant le typage statique et la vérification à la compilation (introduit en S4).

---

## U

### UI (User Interface)
Interface utilisateur. Correspond à tout ce qui est visible et interactif dans TaskForge.

---

## K

### Kubernetes
Plateforme d’orchestration de conteneurs utilisée pour le déploiement final (S11).  
Elle gère les pods, services et déploiements.

---

**Dernière mise à jour :** _Semaine 2 — MVP LocalStorage_
