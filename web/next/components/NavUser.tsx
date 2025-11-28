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
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xs font-semibold text-slate-100 hover:bg-white/10"
        aria-label="Menu utilisateur"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-black/90 shadow-xl backdrop-blur">
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
