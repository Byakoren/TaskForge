// Contexte global pour gérer les tâches dans toute l’application
// Fournit les fonctions : add, toggle, remove, reload
// et partage la liste des tâches via React Context

import { createContext, useContext, useEffect, useMemo, useState, useRef } from "react";
import type { Task, ID } from "../types";
import * as api from "../lib/api";

// Type du contexte (structure partagée entre les composants)
type TasksCtx = {
  tasks: Task[];
  loading: boolean;
  add: (title: string) => Promise<void>;
  toggle: (id: ID) => Promise<void>;
  remove: (id: ID) => Promise<void>;
  reload: () => Promise<void>;
};

// Création du contexte (valeur par défaut = null)
const Ctx = createContext<TasksCtx | null>(null);

// Hook personnalisé pour accéder facilement au contexte
export const useTasks = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("TasksProvider missing"); // sécurité si mal utilisé
  return v;
};

// Fournisseur du contexte (englobe toute l’app)
export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Recharge toutes les tâches depuis l’API
  const reload = async () => {
    setLoading(true);
    try {
      const data = await api.listTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("reload failed:", e);
      setTasks(prev => (Array.isArray(prev) ? prev : []));
    } finally {
      setLoading(false);
    }
  };

  // Ajoute une nouvelle tâche
  const add = async (title: string) => {
    try {
      const t = await api.createTask(title);
      setTasks(prev => (Array.isArray(prev) ? [t, ...prev] : [t]));
    } catch (e) {
      console.error("create failed:", e);
    }
  };

  // Bascule le statut d’une tâche (fait ↔ à faire)
  const toggle = async (id: string | number) => {
    try {
      const t = await api.toggleTask(id);
      setTasks(prev =>
        Array.isArray(prev)
          ? prev.map(x => (String(x.id) === String(t.id) ? t : x))
          : [t]
      );
    } catch (e) {
      console.error("toggle failed:", e);
    }
  };

  // Supprime une tâche
  const remove = async (id: string | number) => {
    try {
      await api.deleteTask(id);
      setTasks(prev =>
        Array.isArray(prev)
          ? prev.filter(x => String(x.id) !== String(id))
          : []
      );
    } catch (e) {
      console.error("delete failed:", e);
    }
  };

  // Chargement initial (évite double exécution en mode dev)
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    void reload();
  }, []);

  // Valeur du contexte (mémoïsée pour éviter les rerenders inutiles)
  const value = useMemo(
    () => ({ tasks, loading, add, toggle, remove, reload }),
    [tasks, loading]
  );

  // Fournit le contexte à tous les enfants
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
