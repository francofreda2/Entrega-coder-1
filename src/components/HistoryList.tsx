"use client";

import { StoredProposal } from "@/types";
import Link from "next/link";

interface Props {
  proposals: StoredProposal[];
}

export default function HistoryList({ proposals }: Props) {
  if (proposals.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">📋</p>
        <p className="font-medium">No hay propuestas generadas aún.</p>
        <Link href="/" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
          Crear la primera propuesta
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {proposals.map((p) => (
        <Link
          key={p.id}
          href={`/history/${p.id}`}
          className="block bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-4 shadow-sm hover:shadow transition-all"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 truncate">{p.projectName}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {p.input.projectType} · {p.input.area}
              </p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                {p.input.description}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400 whitespace-nowrap">
                {new Date(p.createdAt).toLocaleDateString("es-AR")}
              </p>
              <p className="text-xs text-gray-300 mt-1">{p.id.slice(0, 8)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
