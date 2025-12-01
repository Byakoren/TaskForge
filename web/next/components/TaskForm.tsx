"use client";

import { useState } from "react";

type TaskFormProps = {
  onAdd: (title: string) => void | Promise<void>;
};

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = title.trim();
    if (!v) return;

    await onAdd(v);
    setTitle("");
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-2 md:flex-row md:items-center"
    >
      <label htmlFor="new-task" className="sr-only">
        Nouvelle tâche
      </label>

      <input
        id="new-task"
        placeholder="Ajouter une tâche…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input flex-1"
      />

      <button
        type="submit"
        disabled={!title.trim()}
        className="btn-primary mt-1 w-full justify-center disabled:opacity-60 md:mt-0 md:w-auto"
      >
        Ajouter
      </button>
    </form>
  );
}
