/**
 * Adapter LLM — abstrae la llamada a Anthropic.
 *
 * Diseño:
 * - La función generateProposal() es el único punto de contacto con el LLM.
 * - El modelo se configura via variable de entorno LLM_MODEL (o el default).
 * - Para cambiar de proveedor LLM en el futuro: solo hay que modificar este archivo.
 *
 * Errores manejados:
 * - API key faltante o inválida
 * - Timeout / error de red
 * - Respuesta vacía del modelo
 */

import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import { readKnowledge } from "./storage";
import type { ProjectInput } from "@/types";

// Modelo por defecto. Se puede sobreescribir con la variable de entorno LLM_MODEL.
const DEFAULT_MODEL = "claude-sonnet-4-6";

// Tiempo máximo de espera para la respuesta del LLM (ms)
const LLM_TIMEOUT_MS = 120_000; // 2 minutos

// Singleton del cliente Anthropic (se inicializa una sola vez)
let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new LLMError(
        "No se encontró la variable de entorno ANTHROPIC_API_KEY. " +
          "Creá el archivo .env.local con tu clave de Anthropic.",
        "MISSING_API_KEY"
      );
    }
    _client = new Anthropic({ apiKey });
  }
  return _client;
}

// ─── Tipos de error ───────────────────────────────────────────────────────────

export type LLMErrorCode =
  | "MISSING_API_KEY"
  | "LLM_TIMEOUT"
  | "LLM_EMPTY_RESPONSE"
  | "UNKNOWN";

export class LLMError extends Error {
  constructor(
    message: string,
    public readonly code: LLMErrorCode
  ) {
    super(message);
    this.name = "LLMError";
  }
}

// ─── Función principal ────────────────────────────────────────────────────────

/**
 * Llama al LLM con el input del proyecto y devuelve el Markdown generado.
 * Carga la base de conocimiento desde el storage antes de armar el prompt.
 */
export async function generateProposal(input: ProjectInput): Promise<string> {
  const client = getClient();
  const model = process.env.LLM_MODEL ?? DEFAULT_MODEL;

  // Cargar base de conocimiento
  const knowledgeDocs = await readKnowledge();

  // Construir el prompt de usuario
  const userPrompt = buildUserPrompt(input, knowledgeDocs);

  // Llamada al LLM con timeout
  const response = await Promise.race([
    client.messages.create({
      model,
      max_tokens: 8096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    }),
    new Promise<never>((_, reject) =>
      setTimeout(
        () =>
          reject(
            new LLMError(
              "El modelo tardó demasiado en responder. Intentá de nuevo.",
              "LLM_TIMEOUT"
            )
          ),
        LLM_TIMEOUT_MS
      )
    ),
  ]);

  // Extraer el texto de la respuesta
  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text" || !textBlock.text.trim()) {
    throw new LLMError(
      "El modelo devolvió una respuesta vacía. Intentá de nuevo.",
      "LLM_EMPTY_RESPONSE"
    );
  }

  return textBlock.text;
}
