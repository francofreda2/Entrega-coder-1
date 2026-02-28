import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PM Copilot",
  description: "Asistente de project management basado en IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans bg-gray-50 min-h-screen">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-gray-800 hover:text-blue-600 transition-colors">
              <span className="text-xl">🧭</span>
              <span>PM Copilot</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Nueva propuesta
              </Link>
              <Link href="/history" className="text-gray-600 hover:text-blue-600 transition-colors">
                Historial
              </Link>
              <Link href="/settings" className="text-gray-600 hover:text-blue-600 transition-colors">
                Base de conocimiento
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-200 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-4 text-center text-xs text-gray-400">
            PM Copilot · Propuestas de PM generadas con IA · Las propuestas son puntos de partida y deben ser validadas con el equipo.
          </div>
        </footer>
      </body>
    </html>
  );
}
