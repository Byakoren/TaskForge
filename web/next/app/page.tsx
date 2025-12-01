import Link from "next/link";

export default function HomePage() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="page-kicker mb-6">Bienvenue dans TaskForge</p>
        <h1 className="page-title mb-8">
          La to-do list que tu forges de tes mains.
        </h1>
        <p className="page-subtitle">
          Un seul endroit pour écrire ce que tu as à faire, le classer et le
          cocher quand c&apos;est terminé. Pensé au départ comme un side-project
          de dev, devenu un vrai petit outil pour le quotidien.
        </p>
      </header>

      <section className="grid-2">
        {/* Carte principale */}
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <span className="badge-soft">Board de tâches</span>
          </div>

          <div className="max-w-xl">
            <h2 className="mb-3 text-xl md:text-2xl font-semibold">
              Commence par ton tableau de tâches
            </h2>
            <p className="mb-5 text-sm md:text-[0.95rem] text-slate-200/90">
              Tu notes ce que tu dois faire, tu le glisses dans &quot;À
              faire&quot;, &quot;En cours&quot; ou &quot;Terminées&quot;, et tu
              coches quand c&apos;est plié. Pas de comptes à créer, pas de menus
              compliqués&nbsp;: juste toi et ta liste.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/tasks" className="btn-primary">
                <span>Ouvrir mes tâches</span>
                <span>↗</span>
              </Link>
              <p className="text-xs md:text-sm text-slate-300/80">
                Curieux de la technique ? Jette un œil aux pages SSR / SSG dans
                le menu.
              </p>
            </div>
          </div>
        </div>

        {/* Carte “Comment TaskForge t’aide” */}
        <div className="card-compact">
          <h2 className="mb-4 text-sm font-semibold text-slate-100">
            TaskForge, en trois idées
          </h2>

          <ol className="feature-list">
            <li className="feature-item">
              <span className="feature-bullet">1</span>
              <p>
                <span className="font-medium">Capture vite.</span> Une idée, une
                tâche, un truc à ne pas oublier&nbsp;: tu l&apos;ajoutes en
                quelques secondes et tu passes à autre chose.
              </p>
            </li>
            <li className="feature-item">
              <span className="feature-bullet">2</span>
              <p>
                <span className="font-medium">Vois où tu en es.</span> Le board
                &quot;À faire / En cours / Terminées&quot; te montre
                l&apos;avancement en un coup d&apos;œil, que ce soit pour le
                taf, les études ou perso.
              </p>
            </li>
            <li className="feature-item">
              <span className="feature-bullet">3</span>
              <p>
                <span className="font-medium">Garde une trace.</span> Tes tâches
                terminées restent là pour te rappeler tout ce que tu as déjà
                défoncé.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
