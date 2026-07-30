import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteUrl } from "../lib/site";

const description =
  "Portal independiente para jugar, aprender y conservar el Envite Canario, con WebApp, reglas, variantes, glosario, fuentes, torneos, historia y tienda en preparación.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Envite Canario",
  title: {
    default: "Envite Canario, juego, reglas y cultura",
    template: "%s | Envite Canario",
  },
  description,
  keywords: [
    "Envite Canario",
    "cómo jugar al Envite Canario",
    "reglas del Envite Canario",
    "señas del Envite",
    "juego de cartas canario",
    "torneos de Envite en Canarias",
  ],
  authors: [{ name: "Proyecto Envite Canario" }],
  creator: "Proyecto Envite Canario",
  publisher: "Proyecto Envite Canario",
  category: "Juegos de cartas y cultura canaria",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Envite Canario",
    title: "Envite Canario, juego, reglas y cultura",
    description,
    images: [
      {
        url: "/og.png",
        width: 1680,
        height: 910,
        alt: "Envite Canario: jugar, aprender y conservar la mesa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Envite Canario, juego, reglas y cultura",
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e4d38",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido-principal">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}