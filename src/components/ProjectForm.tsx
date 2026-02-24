"use client";

import { useState } from "react";
import type { ProjectInput } from "@/types";

interface ProjectFormProps {
  onSubmit: (input: ProjectInput) => Promise<void>;
  isLoading: boolean;
}

const PROJECT_TYPES = [
  "Desarrollo de software",
  "Implementación de sistema",
  "Migración de datos",
  "Consultoría / análisis",
  "Transformación digital",
  "Integración de sistemas",
  "Infraestructura / cloud",
  "Otro",
];

export default function ProjectForm({ onSubmit, isLoading }: ProjectFormProps) {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  const isValid = form.description.trim().length > 20;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sección principal */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
          Descripción del proyecto
        </h2>

        {/* Descripción — campo principal */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            ¿De qué trata el proyecto? <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Ej: Necesitamos implementar un sistema de gestión de turnos para el área de RRHH. Actualmente el proceso es manual (Excel + emails). El objetivo es digitalizar y automatizar la asignación de turnos para ~200 empleados, integrar con el sistema de RRHH existente (SAP) y reducir el tiempo de administración semanal."
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
          <p className="text-xs text-slate-400 mt-1">
            Mientras más detalle, mejor será la propuesta. Mínimo 20 caracteres.
            {form.description.length > 0 && (
              <span className={`ml-2 ${form.description.length < 20 ? "text-red-400" : "text-green-600"}`}>
                ({form.description.length} caracteres)
              </span>
            )}
          </p>
        </div>

        {/* Tipo de proyecto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Tipo de proyecto
            </label>
            <select
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Seleccioná un tipo...</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Área / departamento
            </label>
            <input
              type="text"
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="Ej: RRHH, Finanzas, TI, Operaciones..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Objetivo de negocio */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Objetivo de negocio
          </label>
          <input
            type="text"
            name="businessObjective"
            value={form.businessObjective}
            onChange={handleChange}
            placeholder="Ej: Reducir costos operativos, mejorar experiencia del cliente, cumplir regulación..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sistemas */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Sistemas / tecnologías involucradas
          </label>
          <input
            type="text"
            name="systems"
            value={form.systems}
            onChange={handleChange}
            placeholder="Ej: SAP, Salesforce, AWS, React, PostgreSQL, Office 365..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Restricciones */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Restricciones conocidas
          </label>
          <input
            type="text"
            name="constraints"
            value={form.constraints}
            onChange={handleChange}
            placeholder="Ej: Presupuesto máximo $50k, equipo de 3 personas, salir a producción antes de diciembre..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Sección opcionales */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-xs flex items-center justify-center font-bold">2</span>
            Datos opcionales y documentación técnica
          </span>
          <span className={`text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>

        {showAdvanced && (
          <div className="px-6 pb-6 space-y-5 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Duración estimada
                </label>
                <input
                  type="text"
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  placeholder="Ej: 6 meses, Q1 2025, 3 sprints..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Presupuesto estimado
                </label>
                <input
                  type="text"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="Ej: $30.000, sin definir, 500hs..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Documentación técnica adicional por proyecto */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Documentación técnica del proyecto
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Pegá aquí specs técnicas, requisitos funcionales, diagramas en texto,
                restricciones detalladas u otro material. El agente lo usará como contexto adicional.
              </p>
              <textarea
                name="additionalDocs"
                value={form.additionalDocs}
                onChange={handleChange}
                rows={8}
                placeholder="Ej: Requisito funcional RF001: El sistema debe permitir...&#10;Arquitectura actual: servidor on-premise Windows Server 2019...&#10;Integración requerida: API REST con SAP mediante RFC..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
              />
            </div>
          </div>
        )}
      </div>

      {/* Botón de submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white transition-all
            ${isValid && !isLoading
              ? "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95"
              : "bg-slate-300 cursor-not-allowed"
            }
          `}
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generando propuesta...
            </>
          ) : (
            <>
              Generar propuesta
            </>
          )}
        </button>
      </div>
    </form>
  );
}
