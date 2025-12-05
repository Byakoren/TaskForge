"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function NavUser() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading || !user) {
    return null;
  }

  const initial = user.email?.[0]?.toUpperCase() ?? "?";

  async function handleLogout() {
    setOpen(false);
    await logout();
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="nav-user-btn"
        aria-label="Menu utilisateur"
      >
        {initial}
      </button>

      {open && (
        <div className="nav-user-menu">
          <div className="border-b border-white/10 px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              Connecté
            </p>
            <p className="truncate text-xs text-slate-100">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-3 py-2 text-left text-xs text-red-300 hover:bg-red-500/10"
          >
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}
