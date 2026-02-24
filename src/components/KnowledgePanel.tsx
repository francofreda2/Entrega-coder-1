"use client";

import { useState, useEffect } from "react";
import type { KnowledgeDocument } from "@/types";

export default function KnowledgePanel() {
  const [docs, setDocs] = useState<KnowledgeDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newDoc, setNewDoc] = useState({ name: "", content: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchDocs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/knowledge");
      const data = await res.json();
      setDocs(data.documents ?? []);
    } catch {
      setDocs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchDocs(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.name.trim() || !newDoc.content.trim()) return;
    setIsAdding(true);
    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoc),
      });
      if (res.ok) {
        setNewDoc({ name: "", content: "" });
        setShowForm(false);
        await fetchDocs();
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este documento de la base de conocimiento?")) return;
    await fetch(`/api/knowledge/${id}`, { method: "DELETE" });
    await fetchDocs();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Base de conocimiento</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Documentos que el agente usa en todas las propuestas (metodologías, plantillas, estándares).
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Agregar documento
        </button>
      </div>

      {/* Formulario para agregar */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-4">
          <h3 className="font-medium text-blue-900 text-sm">Nuevo documento</h3>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Nombre del documento
            </label>
            <input
              type="text"
              value={newDoc.name}
              onChange={(e) => setNewDoc((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ej: Metodología PM interna, Plantilla EDT empresa, Estándares de nombrado..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Contenido
            </label>
            <textarea
              value={newDoc.content}
              onChange={(e) => setNewDoc((p) => ({ ...p, content: e.target.value }))}
              rows={10}
              placeholder="Pegá aquí la metodología, guía de estilos, plantilla, o cualquier texto que el agente debe conocer al generar propuestas..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isAdding}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-slate-300 transition-colors"
            >
              {isAdding ? "Guardando..." : "Guardar documento"}
            </button>
          </div>
        </form>
      )}

      {/* Lista de documentos */}
      {isLoading ? (
        <div className="text-center py-8 text-slate-400 text-sm">Cargando...</div>
      ) : docs.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 font-medium">No hay documentos en la base de conocimiento</p>
          <p className="text-slate-400 text-sm mt-1">
            Agregá metodologías PM, plantillas de EDT o guías de tu organización.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-slate-200 rounded-xl p-4 flex items-start justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded text-xs font-bold flex items-center justify-center">
                    K
                  </span>
                  <h4 className="font-medium text-slate-800 text-sm truncate">{doc.name}</h4>
                </div>
                <p className="text-xs text-slate-500">
                  {doc.content.length.toLocaleString("es-AR")} caracteres ·{" "}
                  Agregado el{" "}
                  {new Date(doc.createdAt).toLocaleDateString("es-AR")}
                </p>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-mono">
                  {doc.content.slice(0, 150)}...
                </p>
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-red-400 hover:text-red-600 text-xs font-medium shrink-0 transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
