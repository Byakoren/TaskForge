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
        className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-500/60"
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
