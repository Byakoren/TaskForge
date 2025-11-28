import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Providers } from "./providers";
import { NavUser } from "@/components/NavUser";
import Image from "next/image";

export const metadata: Metadata = {
  title: "TaskForge",
  description: "Task manager migré vers Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-linear-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-slate-100 antialiased">
        <Providers>
          {/* Wrapper flex pour footer collé en bas */}
          <div className="flex min-h-dvh flex-col">
            {/* NAVBAR */}
            <header className="border-b border-white/10 bg-black/30 backdrop-blur">
              <div className="app-shell flex items-center justify-between py-3">
                {/* Groupe gauche : logo + liens */}
                <div className="flex items-center gap-8">
                  {/* Logo */}
                  <Link href="/" className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                      <Image
                        src="/logo-enclume.png"
                        alt="TaskForge"
                        width={24}
                        height={24}
                        className="h-8 w-8 object-contain"
                        priority
                      />
                    </span>
                    <span className="text-sm font-semibold tracking-[0.25em] uppercase text-slate-200">
                      TASKFORGE
                    </span>
                  </Link>

                  {/* Liens de navigation */}
                  <nav className="nav-links">
                    <Link href="/" className="nav-link">
                      Accueil
                    </Link>
                    <Link href="/tasks" className="nav-link">
                      Tasks
                    </Link>
                    <Link href="/server-time" className="nav-link">
                      SSR
                    </Link>
                    <Link href="/SSG" className="nav-link">
                      SSG
                    </Link>
                  </nav>
                </div>

                <NavUser />
              </div>
            </header>


            {/* Contenu des pages */}
            <div className="flex-1">
              {children}
            </div>

            {/* FOOTER */}
            <footer className="mt-8 border-t border-white/10 bg-black/20">
              <div className="app-shell flex flex-col items-center justify-between gap-3 py-4 text-[11px] text-slate-400 md:flex-row">
                <span>© 2025 TaskForge — projet Next.js.</span>
                <a
                  href="https://github.com/Byakoren/TaskForge"
                  target="_blank"
                  className="hover:text-slate-200"
                >
                  GitHub du projet
                </a>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}