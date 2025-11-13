export const dynamic = "force-dynamic"; 

export default async function ServerTimePage() {
  const now = new Date().toISOString();

  return (
    <section>
      <h1 className="text-xl font-semibold">test SSR</h1>
      <p className="mt-3">Heure du serveur : {now}</p>
    </section>
  );
}
