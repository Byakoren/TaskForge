"use client";

import { useState, useMemo } from "react";
import type { Task } from "@/types/task";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const remaining = useMemo(
    () => tasks.filter(t => !t.done).length,
    [tasks]
  );

  function add(title: string) {
    setTasks(prev => [...prev, { id: crypto.randomUUID(), title, done: false }]);
  }

  function toggle(id: string) {
    setTasks(prev => prev.map(t => (
      t.id === id ? { ...t, done: !t.done } : t
    )));
  }

  function del(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  return (
    <section>
      <h1 className="text-xl font-semibold">Tasks</h1>
      <p className="opacity-75 mb-4">{remaining} tâches restantes</p>

      <TaskForm onAdd={add} />
      <TaskList tasks={tasks} onToggle={toggle} onDelete={del} />
    </section>
  );
}
