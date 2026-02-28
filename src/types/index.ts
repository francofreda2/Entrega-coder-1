// ─── INPUT DEL FORMULARIO ─────────────────────────────────────────────────────

export interface ProjectInput {
  description: string;
  projectType: string;
  businessObjective: string;
  area: string;
  systems: string;
  constraints: string;
  timeline?: string;
  budget?: string;
  additionalDocs?: string;
}

// ─── OUTPUT DEL AGENTE PM ────────────────────────────────────────────────────

export interface PMProposal {
  rawMarkdown: string;
}

// ─── KNOWLEDGE BASE ──────────────────────────────────────────────────────────

export interface KnowledgeDocument {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

// ─── HISTORIAL ───────────────────────────────────────────────────────────────

export interface StoredProposal {
  id: string;
  createdAt: string;
  projectName: string;
  input: ProjectInput;
  output: PMProposal;
}

// ─── RESPUESTAS DE API ───────────────────────────────────────────────────────

export interface GenerateResponse {
  proposal: StoredProposal;
}

export interface ApiError {
  error: string;
  details?: string;
}
