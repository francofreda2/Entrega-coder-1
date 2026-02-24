"use client";

import { useState } from "react";
import ProjectForm from "@/components/ProjectForm";
import ProposalResult from "@/components/ProposalResult";
import type { ProjectInput, StoredProposal, ApiError } from "@/types";

export default function HomePage() {
  const [proposal, setProposal] = useState<StoredProposal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (input: ProjectInput) => {
    setIsLoading(true);
    setError(null);
    setProposal(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();

      if (!res.ok) {
        const apiError = data as ApiError;
        setError(apiError.error ?? "Ocurrió un error inesperado.");
        return;
      }

      setProposal(data.proposal as StoredProposal);

      // Scroll suave al resultado
      setTimeout(() => {
        document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      setError("No se pudo conectar con el servidor. Verificá tu conexión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          PM Copilot
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Describí tu proyecto y generá los artefactos de project management completos en segundos.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["EDT / WBS", "Hitos", "Riesgos", "KPIs", "Entregables", "Alcance"].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Formulario */}
      <ProjectForm onSubmit={handleSubmit} isLoading={isLoading} />

      {/* Error */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Resultado */}
      {proposal && (
        <div id="resultado" className="mt-8">
          <ProposalResult proposal={proposal} />
        </div>
      )}
    </div>
  );
}
