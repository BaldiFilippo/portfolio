import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* The default ladder jumps 1200 → 1920, so a frame needing 1304 or 1468
       device pixels is handed 1920 and the browser uploads a texture roughly
       twice the area it will ever draw. Two rungs in the gap cover the widths
       this layout actually asks for. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1366, 1536, 1920, 2048, 3840],
  },
};

export default nextConfig;
