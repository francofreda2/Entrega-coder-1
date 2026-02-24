import { NextRequest, NextResponse } from "next/server";
import { readKnowledge, writeKnowledge } from "@/lib/storage";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const documents = await readKnowledge();
    const filtered = documents.filter((d) => d.id !== id);

    if (filtered.length === documents.length) {
      return NextResponse.json({ error: "Documento no encontrado." }, { status: 404 });
    }

    await writeKnowledge(filtered);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar el documento." }, { status: 500 });
  }
}
