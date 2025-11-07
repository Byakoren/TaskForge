// Formulaire d’ajout de tâche
// Permet à l’utilisateur de saisir un titre et d’ajouter une tâche via le contexte

import { useState } from "react";
import { useTasks } from "../context/TasksContext";

export default function TaskForm() {
  const { add } = useTasks();             // fonction d’ajout depuis le contexte
  const [title, setTitle] = useState(""); // champ contrôlé pour le titre

  // Soumission du formulaire
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();         // empêche le rechargement de la page
    const v = title.trim();     // nettoie les espaces
    if (!v) return;             // ignore si le champ est vide
    await add(v);               // ajoute la tâche via le contexte
    setTitle("");               // réinitialise le champ
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
      <input
        placeholder="Nouvelle tâche…"
        value={title}
        onChange={e => setTitle(e.target.value)} // met à jour le state à chaque frappe
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
