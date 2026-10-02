import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo's CLAUDE.md is curated and must not be modified (see task constraints).
  agentRules: false,
};

export default nextConfig;
