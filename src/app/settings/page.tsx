"use client";

import { useState, useEffect, useCallback } from "react";
import { KnowledgeDocument } from "@/types";

export default function SettingsPage() {
  const [docs, setDocs] = useState<KnowledgeDocument[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const loadDocs = useCallback(async () => {
    const res = await fetch("/api/knowledge");
    const data = await res.json();
    setDocs(data.docs || []);
  }, []);

  useEffect(() => {
    loadDocs();
  }, [loadDocs]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setError("El nombre y el contenido son requeridos.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error);
        return;
      }
      setName("");
      setContent("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      await loadDocs();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch("/api/knowledge", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await loadDocs();
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Base de conocimiento</h1>
        <p className="text-gray-500 text-sm mt-1">
          Agregá documentos de metodología, plantillas o estándares de PM. El agente los usará en TODAS las propuestas generadas.
        </p>
      </div>

      {/* Documentos existentes */}
      {docs.length > 0 && (
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Documentos activos</h2>
          {docs.map((doc) => (
            <div key={doc.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-gray-800">{doc.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(doc.createdAt).toLocaleDateString("es-AR")} · {doc.content.length.toLocaleString()} caracteres
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{doc.content.slice(0, 200)}...</p>
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-2 py-1 rounded shrink-0 transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Formulario para agregar */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Agregar documento</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nombre del documento
            </label>
            <input
              type="text"
              placeholder="Ej: Metodología PM empresa, Plantilla EDT estándar..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={saving}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contenido
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Pegá el texto completo del documento. Puede ser una metodología, un estándar, una plantilla, guías de nomenclatura, etc.
            </p>
            <textarea
              rows={10}
              placeholder="Pegá aquí el contenido del documento de referencia..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              disabled={saving}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">Documento guardado correctamente.</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            {saving ? "Guardando..." : "Guardar documento"}
          </button>
        </form>
      </div>
    </div>
  );
}
