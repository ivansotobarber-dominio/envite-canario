import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteUrl } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Envite Canario",
  title: {
    default: "Envite Canario",
    template: "%s | Envite Canario",
  },
  description:
    "Proyecto independiente para aprender, jugar y conservar el Envite Canario.",
  authors: [{ name: "Envite Canario" }],
  creator: "Envite Canario",
  publisher: "Envite Canario",
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
    title: "Envite Canario",
    description: "Jugar. Aprender. Conservar la mesa.",
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
    title: "Envite Canario",
    description: "Jugar. Aprender. Conservar la mesa.",
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
      <body>{children}</body>
    </html>
  );
}
