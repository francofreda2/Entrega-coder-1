import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { readKnowledge, saveKnowledgeDocument, deleteKnowledgeDocument } from "@/lib/storage";

export async function GET() {
  return NextResponse.json({ docs: readKnowledge() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.name?.trim() || !body.content?.trim()) {
    return NextResponse.json({ error: "El nombre y el contenido son requeridos." }, { status: 400 });
  }
  const doc = {
    id: uuidv4(),
    name: body.name.trim(),
    content: body.content.trim(),
    createdAt: new Date().toISOString(),
  };
  saveKnowledgeDocument(doc);
  return NextResponse.json({ doc });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID requerido." }, { status: 400 });
  deleteKnowledgeDocument(id);
  return NextResponse.json({ ok: true });
}
