/**
 * Module : main.js
 * Rôle   : point d’entrée applicatif — orchestre la logique entre UI et Storage.
 *
 * 📘 Documentation :
 * https://github.com/Byakoren/TaskForge/blob/main/docs/modules/main.md
 *
 * Ce module gère le cycle de vie complet de l’application :
 * - initialisation (chargement et normalisation des tâches)
 * - synchronisation du rendu et de la persistance
 * - gestion des interactions via les callbacks du module UI
 */

import { initUI, render, setLoading } from "./ui.js";
import { loadTasks, saveTasks } from "./storage.js";

// État principal de l'application : liste des tâches en mémoire
let tasks = [];

/**
 * Initialisation de l'application :
 * - affiche un état de chargement
 * - charge les données locales
 * - normalise et trie les tâches
 * - déclenche le premier rendu
 */
function boot() {
    setLoading(true);
    tasks = (loadTasks() || []).map(normalizeTask).sort(sortByCreatedDesc);
    render(tasks);
    setLoading(false);
}

/**
 * Normalise la structure d'une tâche pour garantir la cohérence du modèle.
 * @param {Object} t - Donnée brute chargée depuis le storage.
 * @returns {Object} Tâche normalisée.
 */
function normalizeTask(t) {
    return {
        id: t.id,
        title: t.title,
        done: !!t.done,
        status: t.status || (t.done ? "done" : "todo"),
        createdAt: t.createdAt || new Date().toISOString(),
    };
}

/**
 * Trie les tâches par date de création (ordre décroissant).
 */
function sortByCreatedDesc(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
}

/**
 * Persiste les tâches en localStorage et déclenche un nouveau rendu.
 */
function persistAndRender() {
    saveTasks(tasks);
    render(tasks);
}

/**
 * Ajoute une nouvelle tâche à la liste.
 * @param {string} title - Texte saisi par l’utilisateur.
 */
function addTask(title) {
    const now = new Date().toISOString();
    tasks = [
        {
            id: crypto.randomUUID(),
            title: title.trim(),
            done: false,
            status: "todo",
            createdAt: now,
        },
        ...tasks,
    ];
    persistAndRender();
}

/**
 * Inverse l’état d’une tâche (terminée / à faire).
 * Met aussi à jour le statut textuel ("todo" / "done").
 * @param {string} id - Identifiant de la tâche.
 */
function toggleTask(id) {
    tasks = tasks.map((t) =>
        t.id === id
            ? {
                  ...t,
                  done: !t.done,
                  status: !t.done
                      ? "done"
                      : t.status === "done"
                      ? "todo"
                      : t.status,
              }
            : t
    );
    persistAndRender();
}

/**
 * Déplace une tâche vers un autre état (todo / doing / done).
 * Si l’état final est "done", on force le booléen `done` à true.
 * @param {string} id - Identifiant de la tâche.
 * @param {string} toStatus - Nouvel état cible.
 */
function moveTask(id, toStatus) {
    tasks = tasks.map((t) =>
        t.id === id
            ? { ...t, status: toStatus, done: toStatus === "done" ? true : t.done }
            : t
    );
    persistAndRender();
}

/**
 * Renomme une tâche existante.
 * @param {string} id - Identifiant de la tâche.
 * @param {string} newTitle - Nouveau titre saisi.
 */
function renameTask(id, newTitle) {
    tasks = tasks.map((t) =>
        t.id === id ? { ...t, title: newTitle } : t
    );
    persistAndRender();
}

/**
 * Supprime une tâche par son identifiant.
 * @param {string} id - Identifiant de la tâche.
 */
function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    persistAndRender();
}

// Initialisation des callbacks UI → relie les actions de l’interface à la logique applicative
initUI({
    onAdd: addTask,
    onToggle: toggleTask,
    onMove: moveTask,
    onRename: renameTask,
    onDelete: deleteTask,
});

// Démarrage de l’application
boot();
