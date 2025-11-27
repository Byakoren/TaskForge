"use client";

import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { TasksProvider, useTasks } from "@/context/TasksContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function TasksPageInner() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const {
    tasks,
    loading: tasksLoading,
    error,
    add,
    toggle,
    del,
    editTitle,
  } = useTasks();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  const remaining = useMemo(() => tasks.filter((t) => !t.done).length, [tasks]);

  if (authLoading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return null;
  }

  if (tasksLoading) {
    return <p>Chargement des tâches...</p>;
  }

  return (
    <section>
      <div>
        <h1 className="flex items-center justify-between mb-4">Tasks</h1>
        <div className="flex items-center gap-2 text-sm opacity-80">
          <span>Connecté en tant que {user.email}</span>
          <button
            type="button"
            onClick={logout}
            className="px-2 py-1 border border-slate-600 rounded hover:bg-slate-800"
          >
            Se déconnecter
          </button>
        </div>
      </div>

      <p className="mb-4 opacity-75">{remaining} tâches restantes</p>

      {error && <p className="mb-4 text-red-500">Erreur : {error}</p>}

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
    <AuthProvider>
      <TasksProvider>
        <TasksPageInner />
      </TasksProvider>
    </AuthProvider>
  );
}
