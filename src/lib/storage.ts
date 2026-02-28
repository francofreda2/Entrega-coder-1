import fs from "fs";
import path from "path";
import { StoredProposal, KnowledgeDocument } from "@/types";

const DATA_DIR = process.env.VERCEL
  ? "/tmp"
  : path.join(process.cwd(), "data");
const PROPOSALS_FILE = path.join(DATA_DIR, "proposals.json");
const KNOWLEDGE_FILE = path.join(DATA_DIR, "knowledge.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ─── PROPOSALS ───────────────────────────────────────────────────────────────

export function readProposals(): StoredProposal[] {
  ensureDataDir();
  if (!fs.existsSync(PROPOSALS_FILE)) return [];
  try {
    const raw = fs.readFileSync(PROPOSALS_FILE, "utf-8");
    return JSON.parse(raw) as StoredProposal[];
  } catch {
    return [];
  }
}

export function saveProposal(proposal: StoredProposal): void {
  ensureDataDir();
  const proposals = readProposals();
  proposals.unshift(proposal); // más reciente primero
  fs.writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals, null, 2), "utf-8");
}

export function findProposalById(id: string): StoredProposal | undefined {
  return readProposals().find((p) => p.id === id);
}

// ─── KNOWLEDGE BASE ──────────────────────────────────────────────────────────

export function readKnowledge(): KnowledgeDocument[] {
  ensureDataDir();
  if (!fs.existsSync(KNOWLEDGE_FILE)) return [];
  try {
    const raw = fs.readFileSync(KNOWLEDGE_FILE, "utf-8");
    return JSON.parse(raw) as KnowledgeDocument[];
  } catch {
    return [];
  }
}

export function saveKnowledgeDocument(doc: KnowledgeDocument): void {
  ensureDataDir();
  const docs = readKnowledge();
  docs.push(doc);
  fs.writeFileSync(KNOWLEDGE_FILE, JSON.stringify(docs, null, 2), "utf-8");
}

export function deleteKnowledgeDocument(id: string): void {
  ensureDataDir();
  const docs = readKnowledge().filter((d) => d.id !== id);
  fs.writeFileSync(KNOWLEDGE_FILE, JSON.stringify(docs, null, 2), "utf-8");
}
