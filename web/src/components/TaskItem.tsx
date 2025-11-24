// Représente une tâche individuelle dans la liste
// Affiche son titre, son état (fait/à faire) et un bouton de suppression

import type { Task } from "../types";
import { useTasks } from "../context/TasksContext";

export default function TaskItem({ task }: { task: Task }) {
  const { toggle, remove } = useTasks();

  return (
    <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <input type="checkbox" checked={task.done} onChange={() => void toggle(task.id)} />
      <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
        {task.title}
      </span>
      <button onClick={() => void remove(task.id)}>Supprimer</button>
    </li>
  );
}