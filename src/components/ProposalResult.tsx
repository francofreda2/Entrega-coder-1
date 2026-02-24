"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { StoredProposal } from "@/types";

interface ProposalResultProps {
  proposal: StoredProposal;
}

export default function ProposalResult({ proposal }: ProposalResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(proposal.output.rawMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([proposal.output.rawMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${proposal.projectName.replace(/\s+/g, "_")}_PM.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formattedDate = new Date(proposal.createdAt).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header del resultado */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-lg truncate max-w-md">
            {proposal.projectName}
          </h2>
          <p className="text-blue-200 text-xs mt-0.5">
            Generado el {formattedDate} · ID: {proposal.id.slice(0, 8)}
          </p>
        </div>
        {/* Acciones de export */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            title="Copiar como Markdown"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors"
          >
            {copied ? "Copiado!" : "Copiar MD"}
          </button>
          <button
            onClick={handleDownload}
            title="Descargar .md"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors"
          >
            Descargar .md
          </button>
        </div>
      </div>

      {/* Contenido Markdown */}
      <div className="p-6 prose-pm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {proposal.output.rawMarkdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
