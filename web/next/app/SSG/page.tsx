export const revalidate = 60;

export default function AboutPage() {
  const generatedAt = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <section className="app-shell">
      {/* Header de page cohérent avec l'accueil / tasks */}
      <header className="page-header">
        <p className="page-kicker">Rendu statique</p>
        <h1 className="page-title">Test SSG &amp; ISR</h1>
        <p className="page-subtitle">
          Cette page est générée une fois côté serveur, puis régénérée au
          maximum toutes les 60&nbsp;secondes grâce à l&apos;Incremental Static
          Regeneration.
        </p>
      </header>

      {/* Petites cartes de stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <article className="card-compact">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            Mode
          </p>
          <p className="mt-2 text-lg font-semibold">SSG + ISR</p>
          <p className="mt-1 text-xs meta-muted">
            La page est figée au build, puis réactualisée en tâche de fond.
          </p>
        </article>

        <article className="card-compact">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            Revalidate
          </p>
          <p className="mt-2 text-lg font-semibold">60&nbsp;secondes</p>
          <p className="mt-1 text-xs meta-muted">
            Au plus tôt, Next.js tentera une régénération toutes les 60&nbsp;s.
          </p>
        </article>

        <article className="card-compact">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            Dernière génération
          </p>
          <p className="mt-2 text-lg font-semibold">{generatedAt}</p>
          <p className="mt-1 text-xs meta-muted">
            Heure calculée côté serveur, au moment du rendu.
          </p>
        </article>
      </div>

      {/* Petit texte de conclusion */}
      <p className="mt-6 text-xs meta-muted">
        Si tu rafraîchis la page plusieurs fois en moins d&apos;une minute, tu
        devrais voir la même heure. Passé le délai de revalidate, Next.js
        déclenchera une nouvelle génération en arrière-plan.
      </p>
    </section>
  );
}
