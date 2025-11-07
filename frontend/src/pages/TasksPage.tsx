import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useTasks } from "../context/TasksContext";
import type { Task } from "../types";

export default function TasksPage({ filter }: { filter: "all" | "todo" | "done" }) {
  const { tasks, loading } = useTasks();

  const filtered: Task[] = tasks.filter(t =>
    filter === "all" ? true : filter === "todo" ? !t.done : t.done
  );

  return (
    <>
      <TaskForm />
      <hr />
      {loading ? <p>Chargement…</p> :
        filtered.length ? <TaskList tasks={filtered} /> :
        <p>Aucune tâche dans ce filtre.</p>}
    </>
  );
}
