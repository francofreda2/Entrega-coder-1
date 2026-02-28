"use client";

import { useState } from "react";
import { ProjectInput } from "@/types";

interface Props {
  onSubmit: (input: ProjectInput) => void;
  isLoading: boolean;
}

const PROJECT_TYPES = [
  "Desarrollo de software",
  "Implementación de sistema",
  "Migración de datos",
  "Consultoría",
  "Transformación digital",
  "Infraestructura / Cloud",
  "Integración de sistemas",
  "Otro",
];

export default function ProjectForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState<ProjectInput>({
    description: "",
    projectType: "",
    businessObjective: "",
    area: "",
    systems: "",
    constraints: "",
    timeline: "",
    budget: "",
    additionalDocs: "",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectInput, string>>>({});

  function validate(): boolean {
    const newErrors: Partial<Record<keyof ProjectInput, string>> = {};
    if (!form.description.trim() || form.description.trim().length < 20) {
      newErrors.description = "Describí el proyecto con al menos 20 caracteres.";
    }
    if (!form.projectType) {
      newErrors.projectType = "Seleccioná un tipo de proyecto.";
    }
    if (!form.businessObjective.trim()) {
      newErrors.businessObjective = "Indicá el objetivo de negocio.";
    }
    if (!form.area.trim()) {
      newErrors.area = "Indicá el área responsable.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  function set(field: keyof ProjectInput, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Descripción */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Descripción del proyecto <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Ej: Necesitamos migrar nuestro sistema de facturación legacy a una plataforma cloud moderna que permita integrarse con nuestro ERP..."
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          disabled={isLoading}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      {/* Tipo + Área */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Tipo de proyecto <span className="text-red-500">*</span>
          </label>
          <select
            value={form.projectType}
            onChange={(e) => set("projectType", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <option value="">Seleccioná un tipo...</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.projectType && (
            <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Área / Departamento <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej: Tecnología, Operaciones, Finanzas..."
            value={form.area}
            onChange={(e) => set("area", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          {errors.area && (
            <p className="text-red-500 text-xs mt-1">{errors.area}</p>
          )}
        </div>
      </div>

      {/* Objetivo de negocio */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Objetivo de negocio <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Reducir el tiempo de emisión de facturas de 48h a 2h y eliminar errores manuales"
          value={form.businessObjective}
          onChange={(e) => set("businessObjective", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        {errors.businessObjective && (
          <p className="text-red-500 text-xs mt-1">{errors.businessObjective}</p>
        )}
      </div>

      {/* Sistemas + Restricciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Sistemas / Tecnologías
          </label>
          <input
            type="text"
            placeholder="Ej: SAP, AWS, React, Oracle..."
            value={form.systems}
            onChange={(e) => set("systems", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Restricciones conocidas
          </label>
          <input
            type="text"
            placeholder="Ej: Sin downtime en producción, equipo de 3 personas..."
            value={form.constraints}
            onChange={(e) => set("constraints", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Opcionales */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          {showAdvanced ? "▾" : "▸"} Campos opcionales (duración, presupuesto, documentación técnica)
        </button>
      </div>

      {showAdvanced && (
        <div className="space-y-4 border-l-2 border-blue-100 pl-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Duración estimada
              </label>
              <input
                type="text"
                placeholder="Ej: 6 meses, 3 sprints..."
                value={form.timeline}
                onChange={(e) => set("timeline", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Presupuesto estimado
              </label>
              <input
                type="text"
                placeholder="Ej: USD 50.000, sin definir..."
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Documentación técnica del proyecto
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Pegá aquí requisitos técnicos, especificaciones, diagramas en texto, historias de usuario, etc. El agente los usará como contexto específico de este proyecto.
            </p>
            <textarea
              rows={6}
              placeholder="Pegá aquí cualquier documentación relevante: especificaciones técnicas, requisitos funcionales, arquitectura, etc."
              value={form.additionalDocs}
              onChange={(e) => set("additionalDocs", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              disabled={isLoading}
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generando propuesta...
          </>
        ) : (
          "Generar propuesta"
        )}
      </button>
    </form>
  );
}
