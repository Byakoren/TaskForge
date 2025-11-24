# 🧭 Conventions de développement — TaskForge

> Ces règles assurent une cohérence entre les branches, les commits et le style de code tout au long du projet (S1 → S11).  
> Elles s’appliquent à toutes les contributions — code, documentation et configuration.

---

## I/ Git & Workflow

### 🔹 Modèle
- **GitHub Flow simplifié**
  - `main` : branche stable (toujours exécutable)
  - `feat/*` : nouvelle fonctionnalité
  - `fix/*` : correction de bug
  - `docs/*` : documentation
  - `chore/*` : maintenance / configuration
  - `refactor/*` : refonte sans nouvelle feature
  - `test/*` : ajout ou correction de tests

### 🔹 Exemple
```bash
git checkout -b feat/storage-local
# développement...
git commit -m "feat(storage): add LocalStorage wrapper"
git push -u origin feat/storage-local
```

- Chaque branche = une PR petite et ciblée
- Merge uniquement via **Pull Request**

---

## II/ Messages de commit

> Format officiel : **Conventional Commits**  
> ➜ `type(scope): message court`

### 🔹 Types autorisés
| Type       | Description                        | Exemple                                  |
|------------|------------------------------------|------------------------------------------|
| `feat`     | nouvelle fonctionnalité            | `feat(ui): add task list rendering`      |
| `fix`      | correction de bug                  | `fix(storage): handle JSON parse errors` |
| `docs`     | modification de documentation      | `docs(architecture): add S3 API diagram` |
| `style`    | changements de style ou formatage  | `style(ui): tweak dark theme colors`     |
| `refactor` | amélioration interne du code       | `refactor(main): extract render logic`   |
| `test`     | ajout ou modif de tests            | `test(api): add POST /tasks tests`       |
| `chore`    | maintenance / dépendances / config | `chore: update eslint config`            |

---

## III/ Structure du projet

### 🔹 Organisation
```
taskforge/
├─ public/             # HTML statique et assets
├─ src/                # code JS/TS (MVP)
│  ├─ main.js
│  ├─ ui.js
│  └─ storage.js
├─ backend/            # API Express (S3+)
├─ web/           # React / Next.js (S4+)
└─ docs/               # documentation
```

### 🔹 Nommage cohérent
- Modules front : `ui`, `storage`, `api`, etc.
- Un fichier = une responsabilité
- Composants React : nom identique au fichier (`TaskList.jsx` → `TaskList`)

---

## IV/ Documentation

### 🔹 Style
- Markdown (`.md`)
- Langage clair, concis, sections numérotées
- Schémas ASCII ou images dans `docs/assets/`
- Dossiers organisés :
  - `docs/modules/`
  - `docs/architecture/`
  - `docs/infra/`

### 🔹 Titres
- `#` → titre principal  
- `##` → section  
- `###` → sous-section courte  

---

## V/ Versioning

- **SemVer** (Semantic Versioning) : `MAJOR.MINOR.PATCH`
- Exemple :
  - `0.1.0` → MVP LocalStorage (S1–S2)
  - `0.2.0` → API Express (S3)
  - `0.3.0` → React (S4–S5)
- Historique détaillé dans `CHANGELOG.md`

---

## VI/ Outillage recommandé

| Outil                         | Usage                 |
|-------------------------------|--------               |
| **VS Code**                   | Éditeur principal     |
| **ESLint**                    | Qualité de code       |
| **Thunder Client / Postman**  | Tests API Express     |
| **http-server**               | Serveur local (S1–S2) |
| **Docker Desktop / Minikube** | Stack DevOps (S9–S11) |

---

## VII/ Bonnes pratiques générales

- Rester cohérent sur la **langue des commits** (FR ou EN, mais pas les deux).  
- Toujours relire avant commit / PR.  
- Garder `main` toujours stable et exécutable.

---

**Dernière mise à jour :** _Semaine 2 — MVP LocalStorage_
