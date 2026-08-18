export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://envitecanario.es";

export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteBasePath}${normalizedPath}`;
}
