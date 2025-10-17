/**
 * Module : server.js
 * Rôle   : point d’entrée du backend — lance l’application Express sur le port configuré.
 *
 * Ce fichier charge la configuration d’environnement (`.env`), importe l’application Express
 * initialisée dans `app.js`, et démarre l’écoute HTTP sur le port défini (par défaut 3001).
 *
 * Étapes :
 * 1. Charge les variables d’environnement (dotenv)
 * 2. Importe l’application configurée (`app.js`)
 * 3. Démarre le serveur et affiche l’URL dans la console
 *
 * Dépendances :
 * - dotenv : gestion des variables d’environnement
 * - app.js : instance Express préconfigurée
 */


require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[TaskForge API] running on http://localhost:${PORT}`);
});

