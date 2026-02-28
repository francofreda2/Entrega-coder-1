import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { generateWithLLM } from "@/lib/llm";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import { saveProposal, readKnowledge } from "@/lib/storage";
import { ProjectInput, StoredProposal } from "@/types";
import { PMCopilotError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = body as ProjectInput;

    if (!input.description?.trim()) {
      return NextResponse.json({ error: "La descripción del proyecto es requerida." }, { status: 400 });
    }

    const knowledgeDocs = readKnowledge();
    const userPrompt = buildUserPrompt(input, knowledgeDocs);
    const rawMarkdown = await generateWithLLM(SYSTEM_PROMPT, userPrompt);

    // Extraer nombre del proyecto de las primeras palabras de la descripción
    const projectName =
      input.description.trim().split(/\s+/).slice(0, 8).join(" ") +
      (input.description.trim().split(/\s+/).length > 8 ? "..." : "");

    const proposal: StoredProposal = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      projectName,
      input,
      output: { rawMarkdown },
    };

    saveProposal(proposal);

    return NextResponse.json({ proposal });
  } catch (err) {
    if (err instanceof PMCopilotError) {
      return NextResponse.json(
        { error: err.message, code: err.code },
        { status: err.code === "API_KEY_MISSING" ? 500 : 503 }
      );
    }
    console.error("[generate]", err);
    return NextResponse.json({ error: "Error inesperado al generar la propuesta." }, { status: 500 });
  }
}
