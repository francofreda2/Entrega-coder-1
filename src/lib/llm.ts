import Anthropic from "@anthropic-ai/sdk";
import { ApiKeyMissingError, EmptyResponseError, LLMTimeoutError } from "./errors";

// Adapter abstraído: cambiar modelo o proveedor acá sin tocar el resto
const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 8000;
const TIMEOUT_MS = 120_000;

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new ApiKeyMissingError();
  return new Anthropic({ apiKey });
}

export async function generateWithLLM(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const client = getClient();

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new LLMTimeoutError()), TIMEOUT_MS)
  );

  const completionPromise = client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const response = await Promise.race([completionPromise, timeoutPromise]);

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text" || !textBlock.text.trim()) {
    throw new EmptyResponseError();
  }

  return textBlock.text;
}
