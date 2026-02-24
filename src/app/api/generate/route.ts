import { NextRequest, NextResponse } from "next/server";
import type { GenerateRequest, GenerateResponse, StoredProposal, ApiError } from "@/types";
import { generateProposal, LLMError } from "@/lib/llm";
import { saveProposal } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();

    if (!body.input?.description?.trim()) {
      const error: ApiError = {
        error: "La descripción del proyecto es requerida.",
        code: "UNKNOWN",
      };
      return NextResponse.json(error, { status: 400 });
    }

    // ── Llamar al LLM ──────────────────────────────────────────────────────
    const rawMarkdown = await generateProposal(body.input);

    // ── Derivar nombre del proyecto (primeras 6 palabras de la descripción) ─
    const projectName =
      body.input.description
        .trim()
        .split(/\s+/)
        .slice(0, 6)
        .join(" ")
        .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s0-9\-()]/g, "")
        .trim() || "Proyecto sin nombre";

    // ── Construir la propuesta ─────────────────────────────────────────────
    const proposal: StoredProposal = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      projectName,
      input: body.input,
      output: {
        // El Markdown completo es la fuente de verdad.
        // En una versión futura se puede parsear el MD para llenar los campos
        // estructurados (wbsTable, risks[], etc.) y habilitar filtros/búsquedas.
        executiveSummary: "",
        generalObjective: "",
        specificObjectives: [],
        scope: { includes: [], excludes: [] },
        assumptions: [],
        constraints: [],
        wbsTree: "",
        wbsTable: [],
        deliverables: [],
        milestones: [],
        risks: [],
        kpis: [],
        pendingValidations: [],
        rawMarkdown,
      },
    };

    // ── Persistir en historial ─────────────────────────────────────────────
    await saveProposal(proposal);

    const response: GenerateResponse = { proposal };
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    if (err instanceof LLMError) {
      const error: ApiError = { error: err.message, code: err.code };
      const status =
        err.code === "MISSING_API_KEY" ? 503 : err.code === "LLM_TIMEOUT" ? 504 : 500;
      return NextResponse.json(error, { status });
    }

    console.error("[/api/generate] Error inesperado:", err);
    const error: ApiError = {
      error: "Ocurrió un error inesperado al generar la propuesta.",
      code: "UNKNOWN",
    };
    return NextResponse.json(error, { status: 500 });
  }
}
