import { NextResponse } from "next/server";
import { readProposals } from "@/lib/storage";

export async function GET() {
  try {
    const proposals = readProposals();
    return NextResponse.json({ proposals });
  } catch {
    return NextResponse.json({ error: "Error al leer el historial." }, { status: 500 });
  }
}
