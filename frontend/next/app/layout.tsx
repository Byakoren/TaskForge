import "./globals.css"; 
import Link from "next/link";

export const metadata = {
  title: "TaskForge",
  description: "Task manager migrated to Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-neutral-950 text-neutral-100 antialiased">
        <header className="p-4 border-b border-neutral-800">
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="hover:underline">Accueil</Link>
            <Link href="/tasks" className="hover:underline">Tasks</Link>
            <Link href="/server-time" className="hover:underline">SSR</Link>
            <Link href="/SSG" className="hover:underline">SSG</Link>
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
