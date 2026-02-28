import { NextRequest, NextResponse } from "next/server";
import { findProposalById } from "@/lib/storage";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const proposal = findProposalById(id);
  if (!proposal) {
    return NextResponse.json({ error: "Propuesta no encontrada." }, { status: 404 });
  }
  return NextResponse.json({ proposal });
}
