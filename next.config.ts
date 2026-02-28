import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Necesario para que fs (file system) funcione en API routes
  serverExternalPackages: [],
};

export default nextConfig;
