"use client";

import { useState, useEffect } from "react";
import ProposalResult from "@/components/ProposalResult";
import type { StoredProposal } from "@/types";

interface ProposalSummary {
  id: string;
  createdAt: string;
  projectName: string;
  projectType?: string;
  area?: string;
}

export default function HistoryPage() {
  const [summaries, setSummaries] = useState<ProposalSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<StoredProposal | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/proposals")
      .then((r) => r.json())
      .then((d) => setSummaries(d.proposals ?? []))
      .catch(() => setSummaries([]))
      .finally(() => setIsLoading(false));
  }, []);

  const handleOpen = async (id: string) => {
    if (selected?.id === id) {
      setSelected(null);
      return;
    }
    setLoadingId(id);
    try {
      const res = await fetch(`/api/proposals/${id}`);
      const data = await res.json();
      setSelected(data.proposal ?? null);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Historial de propuestas</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Todas las propuestas generadas en este equipo, ordenadas por fecha.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Cargando historial...</div>
      ) : summaries.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 font-medium">No hay propuestas generadas aún</p>
          <p className="text-slate-400 text-sm mt-1">
            <a href="/" className="text-blue-600 hover:underline">Generá tu primera propuesta</a>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {summaries.map((s) => (
            <div key={s.id}>
              <button
                onClick={() => handleOpen(s.id)}
                className={`
                  w-full text-left bg-white border rounded-xl p-4 transition-all
                  ${selected?.id === s.id
                    ? "border-blue-400 shadow-md"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-slate-800 truncate">{s.projectName}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {s.projectType && <span>{s.projectType} · </span>}
                      {s.area && <span>{s.area} · </span>}
                      {new Date(s.createdAt).toLocaleString("es-AR", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span className="text-slate-400 text-sm ml-4 shrink-0">
                    {loadingId === s.id
                      ? "Cargando..."
                      : selected?.id === s.id
                      ? "Cerrar ▲"
                      : "Ver ▼"}
                  </span>
                </div>
              </button>

              {selected?.id === s.id && (
                <div className="mt-2">
                  <ProposalResult proposal={selected} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
