# 🧰 Installation & lancement complet (version finale)

> **Prérequis :**
> - Node.js **v18+**
> - npm (inclus avec Node)
> - Docker Desktop ou équivalent
> - Minikube (optionnel, pour Kubernetes)
>  
> 🧠 *Ce guide s’applique une fois le projet TaskForge entièrement migré vers son architecture full‑stack.*

---

## 🧱 Cloner et installer
```bash
# 1️⃣ Cloner le dépôt
git clone https://github.com/Byakoren/TaskForge.git
cd TaskForge

# 2️⃣ Installer les dépendances (frontend + backend)
npm install
# ou si le projet est organisé en workspaces :
npm run setup
```

---

## 🚀 Lancer en mode développement
```bash
# Lancer le backend Express
cd backend
npm run dev

# Lancer le frontend React / Next.js
cd ../frontend
npm run dev
```
Le frontend sera disponible sur **http://localhost:3000**,  
et l’API sur **http://localhost:4000/api/tasks**

---

## 🐳 Lancer via Docker (stack complète)
```bash
# Build et démarrage des conteneurs
docker-compose up --build

# Optionnel : exécuter en arrière‑plan
docker-compose up -d
```
> 🧩 Les services disponibles :
> - `frontend` → http://localhost:3000  
> - `backend` → http://localhost:4000  
> - `db` (PostgreSQL) → port 5432  

---

## ☸️ Déploiement Kubernetes (Minikube)
```bash
# Démarrer Minikube
minikube start

# Appliquer les manifests
kubectl apply -f k8s/
```
> ⚙️ Les fichiers `deployment.yaml` et `service.yaml` gèrent la mise en place des pods pour le frontend, le backend et la base.

---

## 🧪 Scripts typiques
```bash
npm run dev       # mode dev (React / Next.js / Express)
npm run build     # build de prod
npm run lint      # vérifie le code
npm run test      # lance les tests unitaires
npm run format    # formatte le code (Prettier)
```

---

## 💾 Données & persistance
- La base PostgreSQL est configurée dans `docker-compose.yml`
- Les migrations sont gérées via **Prisma** ou **Sequelize**
- Les volumes Docker assurent la persistance des données entre builds

---

## 🔧 Qualité & CI/CD
- **ESLint** + **Prettier** + **Husky** (pré‑commit)
- **GitHub Actions** pour le lint et les tests automatiques
- **Build Docker** automatisé à chaque push sur `main`

---

## 🧹 Nettoyer
```bash
# Arrêter les conteneurs
docker-compose down

# Supprimer les volumes si besoin
docker-compose down -v
```
