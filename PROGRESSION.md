# 📈 Progression TaskForge

Ce document retrace l’évolution du projet **semaine par semaine** avec une checklist d’objectifs.  
Chaque tâche est cochée `[x]` une fois réalisée.

---

## ✅ Semaine 1-2 — JS / TS (CRUD LocalStorage)
- [ ] Créer une maquette HTML simple (form + liste)
- [ ] Implémenter `ui.js` : capture du formulaire, rendu liste (createElement)
- [ ] Créer `storage.js` : wrapper LocalStorage (load(), save())
- [ ] Implémenter `main.js` : logique (add, remove, toggle, filter)
- [ ] Vérifier que les tâches persistent après refresh

---

## 🔄 Semaine 3 — API Node / Express
- [ ] Créer une API Express avec endpoints CRUD (`/tasks`)
- [ ] Connecter le front TS à l’API (remplacer LocalStorage par requêtes)
- [ ] Gérer les erreurs avec un middleware dédié
- [ ] Tester avec Postman / Thunder Client

---

## 🐳 Semaine 4 — Docker
- [ ] Créer un `Dockerfile` pour l’API Express
- [ ] Documenter les commandes build/run
- [ ] Ajouter `.dockerignore`

---

## 🐘 Semaine 5 — PostgreSQL + Docker Compose
- [ ] Créer un `docker-compose.yml` avec `api + db`
- [ ] Configurer la connexion Node ↔ Postgres (pg / Prisma / Sequelize)
- [ ] Créer une table `tasks` avec champs (id, title, description, status, created_at)
- [ ] Vérifier les CRUD sur Postgres

---

## ☸️ Semaine 6 — Kubernetes (bases)
- [ ] Écrire un `deployment.yaml` pour l’API
- [ ] Ajouter un `service.yaml` pour exposer l’API
- [ ] Tester via Minikube (`kubectl port-forward`)

---

## ⚛️ Semaine 7 — Front React + TypeScript
- [ ] Créer une app React TS (`create-react-app` ou Vite)
- [ ] Afficher les tâches depuis l’API (`fetch` ou `axios`)
- [ ] Ajouter formulaire pour créer / supprimer / toggle une tâche
- [ ] Utiliser Context ou Redux pour gérer le state global

---

📌 Ce fichier sera mis à jour chaque semaine avec les tâches accomplies ✅
