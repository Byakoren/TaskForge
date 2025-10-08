# ARCHITECTURE — Semaines 1-2 (MVP LocalStorage)

> Portée : front en JavaScript/TypeScript pur, sans backend.  
> Objectif : créer un CRUD complet sur les tâches avec persistance locale.

## 1) Vue d’ensemble
```
public/index.html
↓
src/main.js        # logique centrale (événements, CRUD)
 ├─ ui.js          # affichage DOM (rendu liste, interactions)
 └─ storage.js     # abstraction d’accès aux données (LocalStorage)
```

## 2) Modules et rôles
| Module         | Rôle                                                    |
|----------------|---------------------------------------------------------|
| **index.html** | structure HTML + script `main.js`                       |
| **main.js**    | logique d’application, orchestration UI ↔ Storage       |
| **ui.js**      | gestion du DOM (rendu des tâches, callbacks)            |
| **storage.js** | lecture/écriture via `localStorage` (`taskforge_tasks`) |

## 3) Principes
- Découplage logique / rendu / persistance  
- SRP (responsabilité unique)  
- Abstraction DAL (`storage.js`)  
- Modules ES (`import` / `export`)

## 4) Données
```ts
type Task = { id: number; text: string; done: boolean };
```

## 5) Flux utilisateur
1. L’utilisateur ajoute une tâche via le formulaire  
2. `main.js` crée l’objet et appelle `saveTasks()`  
3. `ui.js` met à jour la liste affichée  
4. Les données persistent après refresh (LocalStorage)

## 6) Notes
- Pas encore de backend ni de build system  
- Lancement via : `npm run dev → http://localhost:8080/public/`
