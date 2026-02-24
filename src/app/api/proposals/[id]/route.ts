import { NextRequest, NextResponse } from "next/server";
import { getProposalById } from "@/lib/storage";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const proposal = await getProposalById(id);

    if (!proposal) {
      return NextResponse.json({ error: "Propuesta no encontrada." }, { status: 404 });
    }

    return NextResponse.json({ proposal });
  } catch {
    return NextResponse.json({ error: "Error al leer la propuesta." }, { status: 500 });
  }
}
