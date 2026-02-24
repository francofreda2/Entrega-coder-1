/**
 * Capa de persistencia local (JSON files).
 * Todas las funciones son async para poder migrar a una DB real en el futuro.
 *
 * Archivos:
 *   data/proposals.json  → historial de propuestas generadas
 *   data/knowledge.json  → base de conocimiento (documentos de metodología)
 */

import { promises as fs } from "fs";
import path from "path";
import type { StoredProposal, KnowledgeDocument } from "@/types";

// Los archivos se guardan en /data (raíz del proyecto, ignorado por git)
const DATA_DIR = path.join(process.cwd(), "data");
const PROPOSALS_FILE = path.join(DATA_DIR, "proposals.json");
const KNOWLEDGE_FILE = path.join(DATA_DIR, "knowledge.json");

/** Asegura que el directorio data/ exista */
async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

// ─── PROPUESTAS ───────────────────────────────────────────────────────────────

export async function readProposals(): Promise<StoredProposal[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(PROPOSALS_FILE, "utf-8");
    return JSON.parse(raw) as StoredProposal[];
  } catch {
    // Archivo no existe todavía → array vacío
    return [];
  }
}

export async function writeProposals(proposals: StoredProposal[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(PROPOSALS_FILE, JSON.stringify(proposals, null, 2), "utf-8");
}

export async function saveProposal(proposal: StoredProposal): Promise<void> {
  const proposals = await readProposals();
  // Insertar al principio para mostrar las más recientes primero
  proposals.unshift(proposal);
  await writeProposals(proposals);
}

export async function getProposalById(id: string): Promise<StoredProposal | null> {
  const proposals = await readProposals();
  return proposals.find((p) => p.id === id) ?? null;
}

// ─── BASE DE CONOCIMIENTO ─────────────────────────────────────────────────────

export async function readKnowledge(): Promise<KnowledgeDocument[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(KNOWLEDGE_FILE, "utf-8");
    return JSON.parse(raw) as KnowledgeDocument[];
  } catch {
    return [];
  }
}

export async function writeKnowledge(documents: KnowledgeDocument[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(KNOWLEDGE_FILE, JSON.stringify(documents, null, 2), "utf-8");
}
