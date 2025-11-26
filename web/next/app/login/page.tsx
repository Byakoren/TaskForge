"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();

  const [email, setEmail] = useState("demo@taskforge.dev");
  const [password, setPassword] = useState("demo123");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Si déjà connecté, on renvoie vers /tasks
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
    return <p>Vérification de la session…</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full border rounded px-2 py-1 bg-slate-900 border-slate-700"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full border rounded px-2 py-1 bg-slate-900 border-slate-700"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2 rounded bg-blue-500 text-white text-sm font-medium disabled:opacity-60"
      >
        {submitting ? "Connexion…" : "Se connecter"}
      </button>

      <p className="text-xs opacity-70 mt-2">
        Compte de démo : demo@taskforge.dev / demo123
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <main className="max-w-md mx-auto mt-16 p-4 border border-slate-800 rounded">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Connexion à TaskForge
        </h1>
        <LoginForm />
      </main>
    </AuthProvider>
  );
}
