"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { StoredProposal } from "@/types";

interface Props {
  proposal: StoredProposal;
}

export default function ProposalResult({ proposal }: Props) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(proposal.output.rawMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([proposal.output.rawMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `propuesta-${proposal.projectName.replace(/\s+/g, "-").toLowerCase()}-${proposal.id.slice(0, 6)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-8">
      {/* Header de resultado */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Propuesta generada</h2>
          <p className="text-xs text-gray-500">
            {new Date(proposal.createdAt).toLocaleString("es-AR")} · ID: {proposal.id.slice(0, 8)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="text-sm border border-gray-300 hover:border-gray-400 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copied ? "✓ Copiado" : "Copiar MD"}
          </button>
          <button
            onClick={handleDownload}
            className="text-sm bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            Descargar .md
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm prose prose-sm prose-gray max-w-none
        prose-headings:font-bold prose-headings:text-gray-800
        prose-h3:text-base prose-h3:border-b prose-h3:border-gray-200 prose-h3:pb-1 prose-h3:mt-6
        prose-table:text-xs prose-td:py-1.5 prose-th:py-1.5
        prose-code:bg-gray-50 prose-code:px-1 prose-code:rounded
        prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:text-xs">
        <ReactMarkdown>{proposal.output.rawMarkdown}</ReactMarkdown>
      </div>
    </div>
  );
}
