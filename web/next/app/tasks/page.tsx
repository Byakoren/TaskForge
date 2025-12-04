"use client";

import type { ReactNode, PointerEvent } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  DndContext,
  type DragEndEvent,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

import { useAuth } from "@/context/AuthContext";
import { TasksProvider, useTasks } from "@/context/TasksContext";
import { TaskForm } from "@/components/TaskForm";
import type { Task } from "@/types/task";

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

type ColumnId = "todo" | "doing" | "done";

function stopDrag(e: PointerEvent) {
  e.stopPropagation();
}

type BoardColumnProps = {
  id: ColumnId;
  title: string;
  dotClass: string;
  count: number;
  emptyLabel: string;
  children: ReactNode;
};

function BoardColumn({
  id,
  title,
  dotClass,
  count,
  emptyLabel,
  children,
}: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`board-column ${
        isOver
          ? "ring-2 ring-violet-400/70 ring-offset-2 ring-offset-black/40"
          : ""
      }`}
    >
      <div className="board-column-header">
        <div className="board-header-left">
          <span className={`board-dot ${dotClass}`} />
          <h2 className="board-title">{title}</h2>
        </div>
        <span className={`board-count board-count-${id}`}>{count}</span>
      </div>

      <ul className="task-list">
        {count === 0 && <li className="empty-state">{emptyLabel}</li>}
        {children}
      </ul>
    </div>
  );
}

type DraggableTaskCardProps = {
  task: Task;
  column: ColumnId;
  children: ReactNode;
};

function DraggableTaskCard({ task, column, children }: DraggableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: { column },
    });

  const transformStyle = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined;

  const style = {
    transform: transformStyle,
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging ? 10 : 1,
  } as const;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="task-card"
      {...attributes}
      {...listeners}
    >
      {children}
    </li>
  );
}

function TasksContent() {
  const { tasks, add, toggle, del, editTitle, setStatus, loading, error } =
    useTasks();

  // === Recherche ===
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  function matchesQuery(task: Task) {
    if (!normalizedQuery) return true;
    return task.title.toLowerCase().includes(normalizedQuery);
  }

  // === Filtres de colonnes ===
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<{
    todo: boolean;
    doing: boolean;
    done: boolean;
  }>({
    todo: true,
    doing: true,
    done: true,
  });

  function toggleColumn(key: keyof typeof visibleColumns) {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function resetColumns() {
    setVisibleColumns({ todo: true, doing: true, done: true });
  }

  // === Split par colonne (données brutes) ===
  const rawTodo = tasks.filter(
    (t) => t.status === "todo" || (!t.done && !t.status),
  );
  const rawDoing = tasks.filter((t) => t.status === "doing");
  const rawDone = tasks.filter((t) => t.status === "done" || t.done);

  const remainingCount = rawTodo.length + rawDoing.length;

  // === Application du filtre de recherche ===
  const todo = rawTodo.filter(matchesQuery);
  const doing = rawDoing.filter(matchesQuery);
  const done = rawDone.filter(matchesQuery);

  // === Édition inline du titre ===
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  function startEdit(task: Task) {
    setEditingId(task.id);
    setDraftTitle(task.title);
  }

  async function saveEdit() {
    if (!editingId) return;
    const title = draftTitle.trim();
    if (!title) {
      setEditingId(null);
      return;
    }
    await editTitle(editingId, title);
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const columnId = over.id;
    if (columnId !== "todo" && columnId !== "doing" && columnId !== "done") {
      return;
    }

    const taskId = String(active.id);
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    if (task.status === columnId) return;

    void setStatus(taskId, columnId);
  }

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
                ? `${remainingCount} tâche${
                    remainingCount > 1 ? "s" : ""
                  } à terminer.`
                : "Tu es à jour, bien ouéj ✨"}
        </p>
      </header>

      {/* Formulaire + recherche + bouton filtres */}
      <section className="mb-5 flex flex-col gap-3">
        <div className="card-static">
          <TaskForm onAdd={add} />
        </div>

        {/* Barre de recherche + filtres */}
        <div className="card-static relative flex items-center gap-4">
          <label
            htmlFor="task-search"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300"
          >
            Rechercher
          </label>

          <input
            id="task-search"
            type="search"
            placeholder="Rechercher une tâche…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="task-input flex-1"
          />

          <div className="flex items-center gap-3">
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[11px] text-slate-400 hover:text-slate-200"
              >
                Effacer
              </button>
            )}
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:bg-white/10 transition"
            >
              <span className="text-xs">☰</span>
              <span>Filtres</span>
            </button>
          </div>

          {filtersOpen && (
            <div className="mt-3 rounded-xl border border-white/10 bg-black/80 p-3 text-xs shadow-xl md:absolute md:right-4 md:top-12 md:w-64 md:mt-0">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Colonnes visibles
              </p>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-[11px] text-slate-200">
                  <input
                    type="checkbox"
                    checked={visibleColumns.todo}
                    onChange={() => toggleColumn("todo")}
                    className="h-3 w-3 rounded border border-white/30 bg-black/40"
                  />
                  <span>À faire</span>
                </label>

                <label className="flex items-center gap-2 text-[11px] text-slate-200">
                  <input
                    type="checkbox"
                    checked={visibleColumns.doing}
                    onChange={() => toggleColumn("doing")}
                    className="h-3 w-3 rounded border border-white/30 bg-black/40"
                  />
                  <span>En cours</span>
                </label>

                <label className="flex items-center gap-2 text-[11px] text-slate-200">
                  <input
                    type="checkbox"
                    checked={visibleColumns.done}
                    onChange={() => toggleColumn("done")}
                    className="h-3 w-3 rounded border border-white/30 bg-black/40"
                  />
                  <span>Terminées</span>
                </label>
              </div>

              <button
                type="button"
                onClick={resetColumns}
                className="mt-2 text-[11px] text-slate-400 hover:text-slate-200"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>
      </section>

      <DndContext onDragEnd={handleDragEnd}>
        <section className="board">
          {/* À faire */}
          {visibleColumns.todo && (
            <BoardColumn
              id="todo"
              title="À faire"
              dotClass="board-dot-todo"
              count={todo.length}
              emptyLabel={
                normalizedQuery
                  ? "Aucune tâche ne correspond à ta recherche dans cette colonne."
                  : "Rien à faire pour l'instant. Ajoute une tâche pour commencer."
              }
            >
              {todo.map((t) => (
                <DraggableTaskCard key={t.id} task={t} column="todo">
                  <div className="task-main">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => void toggle(t.id)}
                      onPointerDown={stopDrag}
                    />
                    {editingId === t.id ? (
                      <input
                        className="ml-2 flex-1 bg-transparent border-b border-violet-400/70 text-sm text-slate-100 outline-none"
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        onPointerDown={stopDrag}
                        onKeyDown={(e) => {
                          e.stopPropagation();

                          if (e.key === "Enter") {
                            e.preventDefault();
                            void saveEdit();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            cancelEdit();
                          }
                        }}
                        onBlur={() => void saveEdit()}
                        autoFocus
                      />
                    ) : (
                      <span className="task-title">{t.title}</span>
                    )}
                  </div>
                  <div className="task-actions">
                    <button
                      className="task-link-btn"
                      onClick={() => void setStatus(t.id, "doing")}
                      onPointerDown={stopDrag}
                    >
                      En cours
                    </button>
                    <button
                      className="task-link-btn"
                      onClick={() => startEdit(t)}
                      onPointerDown={stopDrag}
                    >
                      Modifier
                    </button>
                    <button
                      className="task-link-btn"
                      onClick={() => void del(t.id)}
                      onPointerDown={stopDrag}
                    >
                      Supprimer
                    </button>
                  </div>
                </DraggableTaskCard>
              ))}
            </BoardColumn>
          )}

          {/* En cours */}
          {visibleColumns.doing && (
            <BoardColumn
              id="doing"
              title="En cours"
              dotClass="board-dot-doing"
              count={doing.length}
              emptyLabel={
                normalizedQuery
                  ? "Aucune tâche ne correspond à ta recherche dans cette colonne."
                  : "Passe une tâche en cours pour la retrouver ici."
              }
            >
              {doing.map((t) => (
                <DraggableTaskCard key={t.id} task={t} column="doing">
                  <div className="task-main">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => void toggle(t.id)}
                      onPointerDown={stopDrag}
                    />
                    {editingId === t.id ? (
                      <input
                        className="ml-2 flex-1 bg-transparent border-b border-violet-400/70 text-sm text-slate-100 outline-none"
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        onPointerDown={stopDrag}
                        onKeyDown={(e) => {
                          e.stopPropagation();

                          if (e.key === "Enter") {
                            e.preventDefault();
                            void saveEdit();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            cancelEdit();
                          }
                        }}
                        onBlur={() => void saveEdit()}
                        autoFocus
                      />
                    ) : (
                      <span className="task-title">{t.title}</span>
                    )}
                  </div>
                  <div className="task-actions">
                    <button
                      className="task-link-btn"
                      onClick={() => void setStatus(t.id, "todo")}
                      onPointerDown={stopDrag}
                    >
                      À faire
                    </button>
                    <button
                      className="task-link-btn"
                      onClick={() => startEdit(t)}
                      onPointerDown={stopDrag}
                    >
                      Modifier
                    </button>
                    <button
                      className="task-link-btn"
                      onClick={() => void del(t.id)}
                      onPointerDown={stopDrag}
                    >
                      Supprimer
                    </button>
                  </div>
                </DraggableTaskCard>
              ))}
            </BoardColumn>
          )}

          {/* Terminées */}
          {visibleColumns.done && (
            <BoardColumn
              id="done"
              title="Terminées"
              dotClass="board-dot-done"
              count={done.length}
              emptyLabel={
                normalizedQuery
                  ? "Aucune tâche ne correspond à ta recherche dans cette colonne."
                  : "Aucune tâche terminée pour le moment. Tu peux cocher les tâches quand elles sont faites."
              }
            >
              {done.map((t) => (
                <DraggableTaskCard key={t.id} task={t} column="done">
                  <div className="task-main">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => void toggle(t.id)}
                      onPointerDown={stopDrag}
                    />
                    <span className="task-title task-title-done">
                      {t.title}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button
                      className="task-link-btn"
                      onClick={() => void del(t.id)}
                      onPointerDown={stopDrag}
                    >
                      Supprimer
                    </button>
                  </div>
                </DraggableTaskCard>
              ))}
            </BoardColumn>
          )}
        </section>
      </DndContext>
    </main>
  );
}
