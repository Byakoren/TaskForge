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
