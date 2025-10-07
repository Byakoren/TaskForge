# 📈 Progression TaskForge (S1 → S11)

Ce document retrace l’évolution du projet **semaine par semaine** avec une checklist d’objectifs.  
Chaque tâche est cochée `[x]` une fois terminée.

---

## 🧩 Semaine 1-2 — JS / TS (CRUD LocalStorage)
- [ ] Créer une maquette HTML simple (form + liste)
- [ ] Implémenter `ui.js` : capture du formulaire, rendu liste (createElement)
- [ ] Créer `storage.js` : wrapper LocalStorage (load(), save())
- [ ] Implémenter `main.js` : logique (add, remove, toggle, filter)
- [ ] Vérifier que les tâches persistent après refresh

---

## 🚀 Semaine 3 — API REST (Node / Express)
- [ ] Initialiser le backend Express (`server.js` / `app.js`)
- [ ] Créer les routes `/tasks` (GET, POST, PUT, DELETE)
- [ ] Gérer les erreurs avec des middlewares (`errorHandler`)
- [ ] Tester l’API avec Postman / Thunder Client
- [ ] Documenter les endpoints

---

## ⚛️ Semaine 4 — React (bases)
- [ ] Créer une app React (Vite ou Create React App)
- [ ] Implémenter les composants de base : `TaskList`, `TaskForm`
- [ ] Gérer le state avec `useState` et `useEffect`
- [ ] Connecter le front à l’API Express
- [ ] Styliser avec TailwindCSS

---

## 🧠 Semaine 5 — React (avancé)
- [ ] Mettre en place Context API (state global)
- [ ] Ajouter le routing (`react-router-dom`)
- [ ] Améliorer la navigation et l’UX
- [ ] Optimiser la structure du projet

---

## 🌐 Semaine 6 — Next.js (bases)
- [ ] Créer un projet Next.js 15
- [ ] Reproduire le front React en pages Next.js
- [ ] Comprendre SSR vs SSG
- [ ] Commencer la migration front

---

## 🔐 Semaine 7 — Next.js (avancé)
- [ ] Implémenter API routes Next.js
- [ ] Ajouter authentification légère (JWT)
- [ ] Protéger les routes côté serveur
- [ ] Finaliser la migration front complète

---

## 🎨 Semaine 8 — UI/UX avancée
- [ ] Ajouter Drag & Drop (React DnD)
- [ ] Filtres et recherche de tâches
- [ ] Thème clair/sombre (Tailwind)
- [ ] Améliorer la responsivité et transitions

---

## 🐳 Semaine 9 — Docker (bases)
- [ ] Créer le `Dockerfile` (backend)
- [ ] Ajouter `.dockerignore`
- [ ] Builder et exécuter le conteneur
- [ ] Tester les endpoints en local

---

## 🗃️ Semaine 10 — PostgreSQL + Docker Compose
- [ ] Créer `docker-compose.yml`
- [ ] Lier PostgreSQL à Express (`pg` ou `Sequelize`)
- [ ] Créer la table `tasks`
- [ ] Vérifier le CRUD complet avec persistance

---

## ☸️ Semaine 11 — Kubernetes (bases)
- [ ] Installer Minikube
- [ ] Créer `deployment.yaml` et `service.yaml`
- [ ] Déployer l’API et le front dans le cluster
- [ ] Vérifier les pods et services actifs
