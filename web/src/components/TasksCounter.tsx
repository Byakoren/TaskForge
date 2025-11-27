import { useMemo } from "react";
import { useTasks } from "../context/TasksContext";

export default function TasksCounter() {
  const { tasks, loading } = useTasks();

  const { total, todo, done } = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter(t => !t.done).length;
    const done = total - todo;
    return { total, todo, done };
  }, [tasks]);

  return (
    <p style={{ opacity: 0.85, margin: "8px 0" }}>
      {loading ? "Chargement…" : (
        <>
          <strong>{todo}</strong> à faire / <strong>{total}</strong> au total
          {total > 0 && <> — {Math.round((done / total) * 100)}% terminé</>}
        </>
      )}
    </p>
  );
}
