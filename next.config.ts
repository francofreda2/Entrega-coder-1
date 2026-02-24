import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La API de Anthropic se llama siempre desde el servidor (API routes).
  // Nunca exponemos la API key al cliente.
};

export default nextConfig;
