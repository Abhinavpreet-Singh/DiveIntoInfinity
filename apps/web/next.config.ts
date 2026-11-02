import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    // The web app was scaffolded standalone and has its own package-lock.json,
    // so Next.js auto-detects `apps/web` as the project root. That boundary
    // hides monorepo-root-hoisted deps (e.g. `@swc/helpers`) from Turbopack.
    // Point the root at the monorepo root so hoisted deps resolve.
    root: path.resolve(__dirname, "..", ".."),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/start-project",
        destination: "/start",
        permanent: true,
      },
      {
        source: "/start-a-project",
        destination: "/start",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
