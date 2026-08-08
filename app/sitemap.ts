import type { MetadataRoute } from "next";
import { newsPosts, products } from "./content";
import { siteUrl } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-07-30T00:00:00+01:00");
  const coreRoutes = [
    { route: "", priority: 1, changeFrequency: "weekly" as const },
    { route: "/app", priority: 0.95, changeFrequency: "weekly" as const },
    { route: "/como-jugar", priority: 0.95, changeFrequency: "monthly" as const },
    { route: "/normas-y-variantes", priority: 0.9, changeFrequency: "monthly" as const },
    { route: "/glosario", priority: 0.85, changeFrequency: "monthly" as const },
    { route: "/fuentes", priority: 0.85, changeFrequency: "monthly" as const },
    { route: "/tienda", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/torneos", priority: 0.9, changeFrequency: "daily" as const },
    { route: "/torneos/envite-2-contra-2-tinajo-2026", priority: 0.85, changeFrequency: "daily" as const },
    { route: "/clasificacion", priority: 0.75, changeFrequency: "weekly" as const },
    { route: "/historia", priority: 0.85, changeFrequency: "monthly" as const },
    { route: "/juegos-canarios", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/noticias", priority: 0.85, changeFrequency: "weekly" as const },
    { route: "/redes-sociales", priority: 0.55, changeFrequency: "monthly" as const },
    { route: "/privacidad", priority: 0.3, changeFrequency: "monthly" as const },
    { route: "/informacion-legal", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  const productRoutes = products.map((product) => ({
    route: `/tienda/${product.slug}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  }));

  const newsRoutes = newsPosts.map((post) => ({
    route: `/noticias/${post.slug}`,
    priority: 0.65,
    changeFrequency: "monthly" as const,
  }));

  return [...coreRoutes, ...productRoutes, ...newsRoutes].map((item) => ({
    url: item.route ? `${siteUrl}${item.route}/` : `${siteUrl}/`,
    lastModified: updated,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}
