import { NextRequest, NextResponse } from "next/server";
import type { KnowledgeDocument } from "@/types";
import { readKnowledge, writeKnowledge } from "@/lib/storage";

export async function GET() {
  try {
    const documents = await readKnowledge();
    return NextResponse.json({ documents });
  } catch {
    return NextResponse.json({ error: "Error al leer la base de conocimiento." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: { name: string; content: string } = await req.json();

    if (!body.name?.trim() || !body.content?.trim()) {
      return NextResponse.json(
        { error: "Nombre y contenido son requeridos." },
        { status: 400 }
      );
    }

    const documents = await readKnowledge();

    const newDoc: KnowledgeDocument = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: body.name.trim(),
      content: body.content.trim(),
    };

    documents.push(newDoc);
    await writeKnowledge(documents);

    return NextResponse.json({ document: newDoc }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al guardar el documento." }, { status: 500 });
  }
}
