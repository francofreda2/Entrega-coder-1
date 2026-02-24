// =============================================================================
// PM COPILOT — Tipos e interfaces centrales
// =============================================================================

// ─── INPUT DEL FORMULARIO ────────────────────────────────────────────────────

export interface ProjectInput {
  /** Descripción libre del proyecto (campo principal) */
  description: string;
  /** Tipo: "desarrollo de software", "implementación", "consultoría", etc. */
  projectType: string;
  /** Qué problema de negocio resuelve este proyecto */
  businessObjective: string;
  /** Área o departamento responsable */
  area: string;
  /** Sistemas o tecnologías involucradas */
  systems: string;
  /** Restricciones conocidas (tiempo, presupuesto, equipo, regulaciones) */
  constraints: string;
  /** Duración estimada — opcional */
  timeline?: string;
  /** Presupuesto estimado — opcional */
  budget?: string;
  /** Documentación técnica adicional del proyecto (specs, diagramas en texto, etc.) */
  additionalDocs?: string;
}

// ─── ARTEFACTOS DEL OUTPUT ───────────────────────────────────────────────────

export interface WBSItem {
  /** Código jerárquico: "0", "1.0", "1.1", "1.1.1" */
  code: string;
  level: 0 | 1 | 2 | 3;
  name: string;
  /** Rol o área responsable — siempre marcado "(Supuesto)" si el LLM lo asume */
  responsible?: string;
}

export interface Deliverable {
  name: string;
  description: string;
  phase?: string;
}

export interface Milestone {
  /** Evento completado, no actividad */
  name: string;
  description: string;
  estimatedWeek?: string;
}

export interface Risk {
  description: string;
  probability: "Alta" | "Media" | "Baja";
  impact: "Alto" | "Medio" | "Bajo";
  mitigation: string;
}

export interface KPI {
  name: string;
  description: string;
  target?: string;
}

// ─── PROPUESTA COMPLETA ───────────────────────────────────────────────────────

export interface PMProposal {
  executiveSummary: string;
  generalObjective: string;
  specificObjectives: string[];
  scope: {
    includes: string[];
    excludes: string[];
  };
  assumptions: string[];
  constraints: string[];
  /** Árbol ASCII de la EDT (texto crudo para renderizar en <pre>) */
  wbsTree: string;
  wbsTable: WBSItem[];
  deliverables: Deliverable[];
  milestones: Milestone[];
  risks: Risk[];
  kpis: KPI[];
  pendingValidations: string[];
  /**
   * Respuesta en Markdown del LLM sin parsear.
   * Se usa para: copiar al portapapeles, descargar .md, debug.
   */
  rawMarkdown: string;
}

// ─── HISTORIAL ────────────────────────────────────────────────────────────────

export interface StoredProposal {
  id: string;
  /** ISO 8601 */
  createdAt: string;
  /** Nombre corto derivado de description (primeras palabras) */
  projectName: string;
  input: ProjectInput;
  output: PMProposal;
}

// ─── BASE DE CONOCIMIENTO ─────────────────────────────────────────────────────

export interface KnowledgeDocument {
  id: string;
  /** ISO 8601 */
  createdAt: string;
  /** Nombre descriptivo para mostrar en el panel */
  name: string;
  /** Contenido completo del documento (texto plano o Markdown) */
  content: string;
}

// ─── RESPUESTAS DE API ────────────────────────────────────────────────────────

export interface GenerateRequest {
  input: ProjectInput;
}

export interface GenerateResponse {
  proposal: StoredProposal;
}

export interface ApiError {
  error: string;
  code: "MISSING_API_KEY" | "LLM_TIMEOUT" | "LLM_EMPTY_RESPONSE" | "PARSE_ERROR" | "STORAGE_ERROR" | "UNKNOWN";
}
