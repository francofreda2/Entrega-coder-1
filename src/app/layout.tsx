import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PM Copilot",
  description: "Transformá la descripción de tu proyecto en artefactos de project management completos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans bg-slate-50 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PM</span>
              </div>
              <div>
                <span className="font-bold text-slate-800">PM Copilot</span>
                <span className="text-xs text-slate-500 ml-2 hidden sm:inline">
                  Asistente de Project Management
                </span>
              </div>
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <a
                href="/"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Nueva propuesta
              </a>
              <a
                href="/history"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Historial
              </a>
              <a
                href="/knowledge"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Base de conocimiento
              </a>
            </nav>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 mt-16 py-6 text-center text-xs text-slate-400">
          PM Copilot — Potenciado por Claude (Anthropic)
        </footer>
      </body>
    </html>
  );
}
