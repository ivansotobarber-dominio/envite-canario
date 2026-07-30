import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site";

export const dynamic = "force-static";

const privateApplicationPath = "/webapp/";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [privateApplicationPath],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: [privateApplicationPath],
      },
    ],
    sitemap: siteUrl + "/sitemap.xml",
    host: siteUrl,
  };
}