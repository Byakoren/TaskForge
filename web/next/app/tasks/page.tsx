"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { TasksProvider, useTasks } from "@/context/TasksContext";
import { TaskForm } from "@/components/TaskForm";

export default function TasksPage() {
  return (
    <TasksProvider>
      <TasksGate />
    </TasksProvider>
  );
}

function TasksGate() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return (
      <main className="tasks-shell">
        <p>Chargement…</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return <TasksContent />;
}

function TasksContent() {
  const { tasks, add, toggle, del, editTitle, setStatus, loading, error } =
    useTasks();

  const todo = tasks.filter(
    (t) => t.status === "todo" || (!t.done && !t.status),
  );
  const doing = tasks.filter((t) => t.status === "doing");
  const done = tasks.filter((t) => t.status === "done" || t.done);

  const remainingCount = todo.length + doing.length;

  return (
    <main className="tasks-shell">
      <header className="page-header">
        <p className="page-kicker">L’atelier de tes tâches</p>
        <h1 className="page-title">Prêt à forger ta journée ?</h1>
        <p className="page-subtitle">
          {loading
            ? "Chargement des tâches…"
            : error
              ? `Erreur : ${error}`
              : remainingCount > 0
                ? `${remainingCount} tâche${remainingCount > 1 ? "s" : ""} à terminer.`
                : "Tu es à jour, bien ouéj ✨"}
        </p>
      </header>

      <section className="mb-5 flex flex-col gap-3">
        <div className="card-static">
          <TaskForm onAdd={add} />
        </div>
      </section>

      {/* Board 3 colonnes */}
      <section className="board">
        {/* À faire */}
        <div className="board-column">
          <div className="board-column-header">
            <div className="board-header-left">
              <span className="board-dot board-dot-todo" />
              <h2 className="board-title">À faire</h2>
            </div>
            <span className="board-count board-count-todo">{todo.length}</span>
          </div>

          <ul className="task-list">
            {todo.length === 0 && (
              <li className="empty-state">
                Rien à faire pour l&apos;instant. Ajoute une tâche pour
                commencer.
              </li>
            )}

            {todo.map((t) => (
              <li key={t.id} className="task-card">
                <div className="task-main">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => void toggle(t.id)}
                  />
                  <span className="task-title">{t.title}</span>
                </div>
                <div className="task-actions">
                  <button
                    className="task-link-btn"
                    onClick={() => void setStatus(t.id, "doing")}
                  >
                    En cours
                  </button>
                  <button
                    className="task-link-btn"
                    onClick={() => {
                      const next = window.prompt("Nouveau titre :", t.title);
                      if (next !== null) {
                        void editTitle(t.id, next);
                      }
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    className="task-link-btn"
                    onClick={() => void del(t.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* En cours */}
        <div className="board-column">
          <div className="board-column-header">
            <div className="board-header-left">
              <span className="board-dot board-dot-doing" />
              <h2 className="board-title">En cours</h2>
            </div>
            <span className="board-count board-count-doing">
              {doing.length}
            </span>
          </div>

          <ul className="task-list">
            {doing.length === 0 && (
              <li className="empty-state">
                Passe une tâche en cours pour la retrouver ici.
              </li>
            )}

            {doing.map((t) => (
              <li key={t.id} className="task-card">
                <div className="task-main">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => void toggle(t.id)}
                  />
                  <span className="task-title">{t.title}</span>
                </div>
                <div className="task-actions">
                  <button
                    className="task-link-btn"
                    onClick={() => void setStatus(t.id, "todo")}
                  >
                    À faire
                  </button>
                  <button
                    className="task-link-btn"
                    onClick={() => {
                      const next = window.prompt("Nouveau titre :", t.title);
                      if (next !== null) {
                        void editTitle(t.id, next);
                      }
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    className="task-link-btn"
                    onClick={() => void del(t.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Terminées */}
        <div className="board-column">
          <div className="board-column-header">
            <div className="board-header-left">
              <span className="board-dot board-dot-done" />
              <h2 className="board-title">Terminées</h2>
            </div>
            <span className="board-count board-count-done">{done.length}</span>
          </div>

          <ul className="task-list">
            {done.length === 0 && (
              <li className="empty-state">
                Aucune tâche terminée pour le moment. Tu peux cocher les tâches
                quand elles sont faites.
              </li>
            )}

            {done.map((t) => (
              <li key={t.id} className="task-card">
                <div className="task-main">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => void toggle(t.id)}
                  />
                  <span className="task-title task-title-done">{t.title}</span>
                </div>
                <div className="task-actions">
                  <button
                    className="task-link-btn"
                    onClick={() => void del(t.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
