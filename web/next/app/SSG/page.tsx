export const revalidate = 60;

export default function AboutPage() {
  const generatedAt = new Date().toLocaleTimeString();
  return (
    <section>
      <h1 className="text-2xl font-semibold">Test SSG</h1>
      <p className="opacity-75 mt-3">Page générée statiquement (SSG + ISR).</p>
      <p className="mt-2 opacity-60">
        Générée : <strong>{generatedAt}</strong>
      </p>
    </section>
  );
}
