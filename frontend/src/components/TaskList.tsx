// Affiche la liste des tâches
// Utilise le contexte global pour récupérer les tâches et leur état de chargement

import type { Task } from "../types";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul style={{ display: "grid", gap: 8 }}>
      {tasks.map(t => <TaskItem key={t.id} task={t} />)}
    </ul>
  );
}

