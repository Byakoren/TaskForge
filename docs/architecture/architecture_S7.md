# ARCHITECTURE — Semaine 7 (API Routes & Auth Next.js)

## 1. Objectif

Compléter la migration vers Next.js en ajoutant :

- une API de tâches exposée via les API Routes de Next,
- une authentification simple (login + token stocké côté client),
- une protection de la page `/tasks` (accès réservé aux utilisateurs connectés).

⚠️ Implémentation pédagogique : pas de vraie BDD ni de vrai JWT, mais une structure prête pour les prochaines semaines.

---

## 2. Structure liée à S7

    web/next/
      app/
        page.tsx                # Accueil (publique)
        tasks/
          page.tsx              # Page de gestion des tâches (protégée par l'auth)
        login/
          page.tsx              # Page de connexion (publique)
        api/
          tasks/
            data.ts             # Store en mémoire + fonctions CRUD
            route.ts            # GET /api/tasks, POST /api/tasks
            [id]/
              route.ts          # PUT /api/tasks/:id, DELETE /api/tasks/:id
          auth/
            login/
              route.ts          # POST /api/auth/login
      components/
        TaskForm.tsx            # Formulaire d’ajout de tâche (client)
        TaskList.tsx            # Liste des tâches (client, édition + suppression)
      context/
        TasksContext.tsx        # Gestion côté front des tâches (fetch /api/tasks)
        AuthContext.tsx         # Gestion côté front de l’auth (user + token + login/logout)
      lib/
        auth.ts                 # Service d’auth (verifyCredentials)
      types/
        task.ts                 # Type Task utilisé côté front

---

## 3. API Routes — Tâches

### 3.1. Stockage en mémoire

Fichier : `app/api/tasks/data.ts`

- Déclare le type `Task` côté API (id, title, status).
- Stocke les tâches dans un tableau en mémoire :

    const tasks: Task[] = [
      { id: "1", title: "Découvrir Next.js", status: "todo" },
      { id: "2", title: "Brancher API Routes", status: "doing" }
    ];

- Fournit des fonctions :

    listTasks()          → retourne toutes les tâches
    createTask(title)    → ajoute une tâche avec un id auto-incrémenté
    findTask(id)         → retrouve une tâche par id
    updateTask(id, ...)  → modifie title / status
    deleteTask(id)       → supprime une tâche par id

⚠️ Les données sont perdues au redémarrage du serveur dev. Ce module sera remplacé plus tard par une vraie base de données.

### 3.2. Routes `/api/tasks` et `/api/tasks/:id`

Fichiers :

- `app/api/tasks/route.ts`
- `app/api/tasks/[id]/route.ts`

Endpoints :

- `GET /api/tasks`
  - Retourne la liste des tâches (JSON).
- `POST /api/tasks`
  - Crée une nouvelle tâche.
  - Body attendu : `{ "title": "..." }`.
  - Validation minimale : le titre est obligatoire, sinon 400.

- `PUT /api/tasks/:id`
  - Met à jour une tâche existante.
  - Body : champs `title` et/ou `status`.
  - 404 si l’id n’existe pas.

- `DELETE /api/tasks/:id`
  - Supprime une tâche.
  - 404 si l’id n’existe pas.

Les routes utilisent les helpers du fichier `data.ts` et renvoient des statuts HTTP adaptés (200/201/400/404).

---

## 4. API Route — Authentification

### 4.1. Service d’auth

Fichier : `lib/auth.ts`

- Contient un utilisateur de démo en mémoire :

    const DEMO_USER = {
      id: "1",
      email: "demo@taskforge.dev",
      name: "Demo User",
      password: "demo123"
    };

- Fournit la fonction :

    verifyCredentials(email, password): Promise<AuthUser | null>

- Aujourd’hui : compare simplement email/mot de passe à `DEMO_USER`.
- Plus tard : cette fonction sera remplacée par une requête BDD avec requêtes préparées ou ORM.

### 4.2. Route `/api/auth/login`

Fichier : `app/api/auth/login/route.ts`

- `POST /api/auth/login` :

  - Body attendu : `{ "email": "...", "password": "..." }`.

  - Erreurs possibles :
    - 400 → champs obligatoires manquants.
    - 401 → identifiants invalides.

  - Succès (200) :
    - un token simple (string) généré côté serveur ;
    - les infos publiques de l’utilisateur.

    Exemple de réponse :

    {
      "token": "demo-token-1699999999999",
      "user": {
        "id": "1",
        "email": "demo@taskforge.dev",
        "name": "Demo User"
      }
    }

⚠️ Ce n’est pas un vrai JWT, juste un token pédagogique. Aucune vérification de token n’est encore faite côté API `/api/tasks`.

---

## 5. Côté front : Contexts et pages

### 5.1. AuthContext

Fichier : `context/AuthContext.tsx`

- État géré :

    user          → infos de l’utilisateur connecté ou null
    token         → token d’auth ou null
    loading       → hydratation initiale depuis localStorage
    isAuthenticated → booléen dérivé de user + token

- Fonctions exposées :

    login(email, password) → appelle POST /api/auth/login
                              → en cas de succès : met à jour user + token
                              → persiste le tout dans localStorage

    logout()               → vide user + token
                              → nettoie localStorage

- Au premier rendu client :
  - lit `localStorage` pour restaurer `user` + `token` si présents.

### 5.2. TasksContext

Fichier : `context/TasksContext.tsx`

- Récupère les tâches depuis `/api/tasks` (fetch).
- État exposé :

    tasks     → liste des tâches
    loading   → chargement en cours
    error     → message d’erreur éventuel

- Méthodes :

    add(title)              → POST /api/tasks
    toggle(id)              → PUT /api/tasks/:id (changement de statut)
    del(id)                 → DELETE /api/tasks/:id
    editTitle(id, newTitle) → PUT /api/tasks/:id (mise à jour du titre)

- Convertit le format API (status: "todo" | "doing" | "done") vers le format front utilisé par les composants (par exemple `done: boolean`).

---

## 6. Pages front protégées

### 6.1. Page `/login`

Fichier : `app/login/page.tsx`

- Formulaire de connexion :
  - champs email et mot de passe,
  - appel à `login()` du AuthContext,
  - en cas de succès → redirection vers `/tasks`,
  - en cas d’échec → affichage d’un message d’erreur.

- Utilise `AuthProvider` pour envelopper le formulaire et fournir le contexte.

### 6.2. Page `/tasks`

Fichier : `app/tasks/page.tsx`

- Enveloppe la page avec :

    <AuthProvider>
      <TasksProvider>
        <TasksPageInner />
      </TasksProvider>
    </AuthProvider>

- Comportement :

  - si `authLoading` → affiche “Vérification de la connexion…” ;
  - si pas de `user` après chargement → redirection vers `/login` (guard côté client) ;
  - si connecté :
    - affiche les tâches,
    - permet ajout / édition / suppression,
    - affiche l’email de l’utilisateur et un bouton “Se déconnecter”.

La page `/tasks` est donc considérée comme une zone “app” privée, tandis que `/`, `/SSR`, `/SSG` et `/login` restent publics.

---

## 7. Limites actuelles et évolutions prévues

- Pas de base de données réelle :
  - les tâches et l’utilisateur de démo sont stockés en mémoire dans le serveur Next.

- Token non vérifié côté API :
  - l’auth protège l’interface (`/tasks`),
  - mais les routes `/api/tasks` restent appelables directement (ex : Postman).

- Pas de JWT ni de refresh token :
  - token simple stocké dans `localStorage`,
  - suffisant dans le cadre pédagogique actuel.

Évolutions possibles pour les prochaines semaines :

- brancher une BDD réelle (PostgreSQL via Docker Compose),
- remplacer le token simple par un JWT signé,
- ajouter une vérification du token côté API ou un middleware Next pour restreindre `/api/tasks`,
- gérer l’expiration des sessions et le refresh des tokens.
