"use client";

import { useMemo } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { TasksProvider, useTasks } from "@/context/TasksContext";

function TasksPageInner() {
  const { tasks, loading, error, add, toggle, del, editTitle } = useTasks();

  const remaining = useMemo(() => tasks.filter((t) => !t.done).length, [tasks]);

  if (loading) {
    return <p>Chargement des tâches…</p>;
  }

  return (
    <section>
      <h1 className="text-xl font-semibold">Tasks</h1>
      <p className="opacity-75 mb-4">{remaining} tâches restantes</p>

      {error && <p className="text-red-500 mb-2">Erreur : {error}</p>}

      <TaskForm onAdd={add} />
      <TaskList
        tasks={tasks}
        onToggle={toggle}
        onDelete={del}
        onEdit={editTitle}
      />
    </section>
  );
}

export default function TasksPage() {
  return (
    <TasksProvider>
      <TasksPageInner />
    </TasksProvider>
  );
}
