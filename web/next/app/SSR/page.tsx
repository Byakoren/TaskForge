export const dynamic = "force-dynamic";

export default async function ServerTimePage() {
  const now = new Date();
  const time = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const date = now.toLocaleDateString("fr-FR");

  return (
    <section className="app-shell">
      {/* Header cohérent avec le reste du site */}
      <header className="page-header">
        <p className="page-kicker">Rendu dynamique</p>
        <h1 className="page-title">Test Server Side Rendering</h1>
        <p className="page-subtitle">
          Cette page est recalculée côté serveur à chaque requête grâce au mode{" "}
          <code className="font-mono text-xs">force-dynamic</code>.
        </p>
      </header>

      {/* Cartes d’info */}
      <div className="grid gap-4 md:grid-cols-3">
        <article className="card-compact">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            Mode
          </p>
          <p className="mt-2 text-lg font-semibold">Server Side Rendering</p>
          <p className="mt-1 text-xs meta-muted">
            La page est générée à chaque requête côté serveur.
          </p>
        </article>

        <article className="card-compact">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            Cache
          </p>
          <p className="mt-2 text-lg font-semibold">force-dynamic</p>
          <p className="mt-1 text-xs meta-muted">
            Next.js ne met pas cette route en cache, chaque appel déclenche un
            nouveau rendu.
          </p>
        </article>

        <article className="card-compact">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            Heure serveur
          </p>
          <p className="mt-2 text-lg font-semibold">{time}</p>
          <p className="mt-1 text-xs meta-muted">{date}</p>
        </article>
      </div>

      <p className="mt-6 text-xs meta-muted">
        Si tu rafraîchis la page, l&apos;heure affichée change à chaque fois :
        elle vient directement du serveur, pas du cache du navigateur.
      </p>
    </section>
  );
}
