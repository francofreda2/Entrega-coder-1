export class PMCopilotError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: string
  ) {
    super(message);
    this.name = "PMCopilotError";
  }
}

export class ApiKeyMissingError extends PMCopilotError {
  constructor() {
    super(
      "La variable de entorno ANTHROPIC_API_KEY no está configurada.",
      "API_KEY_MISSING"
    );
  }
}

export class LLMTimeoutError extends PMCopilotError {
  constructor() {
    super(
      "El modelo tardó demasiado en responder. Intentá de nuevo.",
      "LLM_TIMEOUT"
    );
  }
}

export class EmptyResponseError extends PMCopilotError {
  constructor() {
    super(
      "El modelo devolvió una respuesta vacía. Intentá con una descripción más detallada.",
      "EMPTY_RESPONSE"
    );
  }
}
