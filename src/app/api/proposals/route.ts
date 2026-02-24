import { NextResponse } from "next/server";
import { readProposals } from "@/lib/storage";

export async function GET() {
  try {
    const proposals = await readProposals();
    // Devolvemos versión resumida para el listado (sin el rawMarkdown completo)
    const summary = proposals.map(({ id, createdAt, projectName, input }) => ({
      id,
      createdAt,
      projectName,
      projectType: input.projectType,
      area: input.area,
    }));
    return NextResponse.json({ proposals: summary });
  } catch {
    return NextResponse.json({ error: "Error al leer el historial." }, { status: 500 });
  }
}
