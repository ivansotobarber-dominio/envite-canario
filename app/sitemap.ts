import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/privacidad", "/informacion-legal"];

  return routes.map((route) => ({
    url: siteUrl + route,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.3,
  }));
}
