"use client";
import { useState } from "react";

export function TaskForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = title.trim();
    if (!v) return;

    onAdd(v);
    setTitle("");
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        className="px-3 py-2 rounded bg-neutral-900 border border-neutral-800"
        placeholder="Nouvelle tâche…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="px-3 py-2 rounded bg-white text-black">
        Ajouter
      </button>
    </form>
  );
}
