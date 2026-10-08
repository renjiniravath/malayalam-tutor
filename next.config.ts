import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Prerendered lesson pages are static, so the client router may keep a
    // prefetched entry for 30 minutes instead of the 300 s default. The
    // default made the back-to-lessons tap block on a fresh RSC fetch once
    // the entry aged out (measured: 408 ms, 6 s when the fetch stalled).
    staleTimes: { static: 1800 },
  },
};

export default nextConfig;
