/**
 * Cloudflare provides this virtual module at worker runtime. The public site
 * is also exported to GitHub Pages, where the database module is unused but
 * TypeScript still needs to resolve its declaration during the static build.
 */
declare module "cloudflare:workers" {
  export const env: {
    DB?: unknown;
  };
}
