import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] || "envite-canario";
const customDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN?.trim();
const pagesBasePath =
  isGitHubPages && !customDomain ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath || undefined,
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: true,
  },
  typescript: isGitHubPages
    ? {
        tsconfigPath: "./tsconfig.pages.json",
        // The Cloudflare worker is deployed separately and is not part of the
        // static Pages artifact. Keep its type checking in the worker flow.
        ignoreBuildErrors: true,
      }
    : undefined,
};

export default nextConfig;
