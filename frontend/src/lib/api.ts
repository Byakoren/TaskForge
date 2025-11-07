// Fonctions d’appel à l’API Express pour gérer les tâches (CRUD)

import type { Task } from "../types";

// Transforme la réponse en tableau de tâches valide
function asArray(x: any): Task[] {
  if (Array.isArray(x)) return x;
  if (x && Array.isArray(x.data)) return x.data; 
  return [];
}

// Transforme un objet quelconque en tâche cohérente
function asTask(x: any): Task {
  const t = x && (x.data ?? x); 
  return {
    id: t?.id ?? crypto.randomUUID(),
    title: t?.title ?? "",
    done: !!t?.done,
    createdAt: t?.createdAt ?? new Date().toISOString(),
    updatedAt: t?.updatedAt,
  };
}

// Récupère le JSON d’une réponse ou lance une erreur si statut invalide
async function getJSON(res: Response) {
  if (!res.ok) throw new Error(`${res.url} -> ${res.status}`);
  try { return await res.json(); } catch { return null; }
}

// Récupère toutes les tâches (GET)
export async function listTasks(): Promise<Task[]> {
  const j = await fetch(`/api/tasks`).then(getJSON);
  return asArray(j).map(asTask);
}

// Crée une nouvelle tâche (POST)
export async function createTask(title: string): Promise<Task> {
  const j = await fetch(`/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then(getJSON);
  return asTask(j);
}

// Bascule le statut d’une tâche (PATCH)
export async function toggleTask(id: string | number): Promise<Task> {
  const j = await fetch(`/api/tasks/${id}/toggle`, { method: "PATCH" }).then(getJSON);
  return asTask(j);
}

// Supprime une tâche (DELETE)
export async function deleteTask(id: string | number): Promise<void> {
  const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`${res.url} -> ${res.status}`);
}
