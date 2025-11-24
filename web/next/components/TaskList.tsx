"use client";

import type { Task } from "@/types/task";

export function TaskList({
  tasks,
  onToggle,
  onDelete,
}: {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  if (tasks.length === 0) {
    return <p className="opacity-70">Aucune tâche.</p>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((t) => (
        <li key={t.id} className="flex items-center gap-2">
          <input type="checkbox" checked={t.done} onChange={() => onToggle(t.id)} />
          <span className={t.done ? "line-through opacity-70" : ""}>
            {t.title}
          </span>
          <button
            className="ml-auto text-sm opacity-70 hover:opacity-100"
            onClick={() => onDelete(t.id)}
          >
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}
