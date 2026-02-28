"use client";

import { useState } from "react";
import ProjectForm from "@/components/ProjectForm";
import ProposalResult from "@/components/ProposalResult";
import { ProjectInput, StoredProposal } from "@/types";

export default function HomePage() {
  const [proposal, setProposal] = useState<StoredProposal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(input: ProjectInput) {
    setIsLoading(true);
    setError(null);
    setProposal(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al generar la propuesta.");
        return;
      }
      setProposal(data.proposal);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } catch {
      setError("Error de conexión. Verificá que el servidor esté corriendo.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">PM Copilot</h1>
        <p className="text-gray-500 mt-1">
          Describí tu proyecto y generá una propuesta de project management completa en segundos.
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <ProjectForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Skeleton de carga */}
      {isLoading && (
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6" />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-3 bg-gray-100 rounded" style={{ width: `${70 + (i % 3) * 10}%` }} />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6 text-center">
            El agente está analizando el proyecto y generando la propuesta... (puede tardar hasta 60 segundos)
          </p>
        </div>
      )}

      {/* Resultado */}
      {proposal && <ProposalResult proposal={proposal} />}
    </div>
  );
}
