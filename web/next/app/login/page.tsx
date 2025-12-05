"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();

  const [email, setEmail] = useState("demo@taskforge.dev");
  const [password, setPassword] = useState("demo123");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/tasks");
    }
  }, [loading, isAuthenticated, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
      router.push("/tasks");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erreur lors de la connexion.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="text-sm text-slate-200">Vérification de la session…</div>
    );
  }

  return (
    <div className="card card-nohover max-w-md w-full">
      <h1 className="mb-1 text-lg md:text-xl font-semibold text-center">
        Connexion à TaskForge
      </h1>
      <p className="mb-1 text-[11px] md:text-xs text-center text-slate-400/90">
        La to-do list que tu forges de tes mains.
      </p>
      <p className="mb-6 text-xs md:text-sm text-center text-slate-300/80">
        Connecte-toi pour retrouver ton tableau de tâches.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-200">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-violet-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-200">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-violet-400"
          />
        </div>

        {error && <p className="text-xs md:text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full justify-center disabled:opacity-60"
        >
          {submitting ? "Connexion…" : "Se connecter"}
        </button>
      </form>

      <p className="mt-4 text-[11px] md:text-xs text-center text-slate-400">
        Compte de démo :{" "}
        <span className="font-medium text-slate-200">demo@taskforge.dev</span> /{" "}
        <span className="font-medium text-slate-200">demo123</span>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="app-shell pt-16 lg:pt-24">
      <section className="grid-2 items-start gap-6">
        {/* Carte de connexion */}
        <LoginForm />

        {/* Carte “Pas encore de compte ?” */}
        <div className="card-compact max-w-sm w-full flex flex-col justify-between">
          <div>
            <h2 className="mb-3 text-sm font-semibold text-slate-100">
              Pas encore de compte ?
            </h2>
            <p className="mb-3 text-sm text-slate-300/90">
              Bientôt, tu pourras créer ton propre compte TaskForge pour garder
              tes tâches séparées du compte de démo.
            </p>
            <ul className="space-y-2 text-xs text-slate-300/80">
              <li>• Profil personnel et tâches privées.</li>
              <li>• Historique de tes boards et de tes projets.</li>
              <li>• Pensé pour un usage quotidien, pas seulement la démo.</li>
            </ul>
          </div>

          <div className="mt-5 space-y-2">
            <button
              type="button"
              disabled
              className="w-full rounded-full px-4 py-2 text-sm font-medium
                           border border-violet-400/70 text-violet-100/90
                           bg-transparent cursor-not-allowed opacity-70"
            >
              Créer un compte (bientôt)
            </button>
            <p className="text-[11px] text-center text-slate-400">
              En attendant, utilise le compte de démo à gauche pour explorer
              l&apos;appli et le flux complet de TaskForge.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
