"use client";

import type { Task } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  onEdit?: (id: string, newTitle: string) => void | Promise<void>;
};

export function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="opacity-70">Aucune tâche.</p>;
  }

  function handleEdit(task: Task) {
    if (!onEdit) return;

    const newTitle = window.prompt("Nouveau titre de la tâche :", task.title);

    if (!newTitle) return;

    const trimmed = newTitle.trim();
    if (!trimmed || trimmed === task.title) return;

    void onEdit(task.id, trimmed);
  }

  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => {
              void onToggle(task.id);
            }}
          />
          <span className={task.done ? "line-through opacity-70" : ""}>
            {task.title}
          </span>

          <button
            type="button"
            className="ml-4 text-sm opacity-70 hover:opacity-100"
            onClick={() => handleEdit(task)}
          >
            Modifier
          </button>
          <button
            type="button"
            className="text-sm opacity-70 hover:opacity-100"
            onClick={() => {
              void onDelete(task.id);
            }}
          >
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}
