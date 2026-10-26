import type { Metadata, Viewport } from "next";
import { PortalCinematografico } from "./portal-cinematografico";
import { siteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: { absolute: "ENVITECANARIO.ES | Juegos de Canarias" },
  description: "Entra a Envite Canario, Lucha Canaria y Bola Canaria, o explora nuestro portal cultural independiente.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "ENVITECANARIO.ES", images: ["/images/portal-atlantico-v2.webp"] },
};
export const viewport: Viewport = { themeColor: "#070a0b", colorScheme: "dark" };

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "WebSite", name: "ENVITECANARIO.ES",
      url: `${siteUrl}/`, inLanguage: "es", description: "Portal independiente de juegos y cultura de Canarias",
    }) }} />
    <PortalCinematografico />
  </>;
}
