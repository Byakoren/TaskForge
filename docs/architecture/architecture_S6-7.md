# ARCHITECTURE — Semaine 6-7 (Migration Next.js)

## 1. Objectif
Migrer progressivement le frontend React (S4–S5) vers **Next.js (App Router)** pour bénéficier :
- du rendu serveur (SSR),
- du rendu statique (SSG / ISR),
- du routing natif,
- d’une optimisation automatique du bundler.

---

## 2. Structure du frontend Next.js

```
web/next/
  app/
    layout.tsx        # Layout global de l'application
    page.tsx          # Page d'accueil (Server Component)
    tasks/
      page.tsx        # Page CSR (Client Component) - formulaire et liste
    server-time/
      page.tsx        # Page SSR (force-dynamic)
    about/
      page.tsx        # Page SSG + ISR (revalidate = 60)
  components/
    TaskForm.tsx      # Client Component
    TaskList.tsx      # Client Component
  types/
    task.ts           # Types TS communs
```

---

## 3. Rendu (SSR / SSG / CSR)

### ● SSR — Server-Side Rendering
- Page : `/server-time`
- Code : `export const dynamic = "force-dynamic"`
- Exécution **à chaque requête**
- Données toujours à jour

### ● SSG/ISR — Static Site Generation
- Page : `/about`
- Code : `export const revalidate = 60`
- Générée une fois puis remise à jour toutes les 60 secondes

### ● CSR — Client Side Rendering
- Page : `/tasks`
- `use client`
- `useState` + interactions

---

## 4. Style et UI
- Tailwind CSS (v4)
- Styles globaux dans `globals.css`
- Navigation via `<Link>` pour éviter les reloads

---

## 5. Suite (S7)
- API Routes Next.js
- Authentification JWT
- Middleware / sécurisation

---

## 6. Résultat
Frontend Next.js opérationnel avec SSR, SSG, ISR et CSR.
