/**
 * Module : storage.js
 * Rôle  : gestion du stockage local (LocalStorage)
 * 
 * 📘 Documentation :
 * https://github.com/Byakoren/TaskForge/blob/main/docs/modules/storage.md
 *
 * Ce module centralise la lecture/écriture des tâches dans le navigateur.
 * Il sert d'abstraction entre la logique métier et la persistance.
 */

const STORAGE_KEY = "taskforge_tasks";

export function loadTasks() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
        console.error("Failed to load tasks from localStorage:", e);
        return [];
    }
}

export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
