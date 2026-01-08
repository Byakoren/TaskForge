"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Task } from "@/types/task";

type UiTaskStatus = "todo" | "doing" | "done";
type DbTaskStatus = "TODO" | "DOING" | "DONE";

type ApiTask = {
  id: string;
  title: string;
  status: DbTaskStatus;
  createdAt?: string;
  updatedAt?: string;
};

function toUiStatus(status: DbTaskStatus): UiTaskStatus {
  return status.toLowerCase() as UiTaskStatus;
}

function toDbStatus(status: UiTaskStatus): DbTaskStatus {
  return status.toUpperCase() as DbTaskStatus;
}

type TasksContextValue = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  add: (title: string) => Promise<void>;
  toggle: (id: string) => Promise<void>;
  del: (id: string) => Promise<void>;
  editTitle: (id: string, newTitle: string) => Promise<void>;
  setStatus: (id: string, status: UiTaskStatus) => Promise<void>;
};

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

function apiTaskToTask(apiTask: ApiTask): Task {
  const status = toUiStatus(apiTask.status);
  return {
    id: apiTask.id,
    title: apiTask.title,
    status,
    done: status === "done",
  };
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) {
        throw new Error("Erreur lors du chargement des tâches");
      }
      const data: ApiTask[] = await res.json();
      setTasks(data.map(apiTaskToTask));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  async function add(title: string) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la création de la tâche");
    }

    const apiTask: ApiTask = await res.json();
    const task = apiTaskToTask(apiTask);
    setTasks((prev) => [...prev, task]);
  }

  async function toggle(id: string) {
    const current = tasks.find((task) => task.id === id);
    if (!current) return;

    const nextStatus: UiTaskStatus =
      current.status === "done" ? "todo" : "done";

    await setStatus(id, nextStatus);
  }

  async function del(id: string) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la suppression de la tâche");
    }

    await res.json();

    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  async function editTitle(id: string, newTitle: string) {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      return;
    }

    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: trimmed }),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la mise à jour du titre de la tâche");
    }

    const apiTask: ApiTask = await res.json();
    const updated = apiTaskToTask(apiTask);

    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
  }

  async function setStatus(id: string, status: UiTaskStatus) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: toDbStatus(status) }),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la mise à jour de la tâche");
    }

    const apiTask: ApiTask = await res.json();
    const updated = apiTaskToTask(apiTask);

    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
  }

  const value: TasksContextValue = {
    tasks,
    loading,
    error,
    reload,
    add,
    toggle,
    del,
    editTitle,
    setStatus,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error(
      "useTasks doit être utilisé à l’intérieur de <TasksProvider>",
    );
  }
  return ctx;
}
