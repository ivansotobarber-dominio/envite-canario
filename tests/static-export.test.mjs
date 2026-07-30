import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function exportedHtml(path) {
  return readFile(new URL(`../out/${path}`, import.meta.url), "utf8");
}

function escapedPattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("exports the complete portal required by GitHub Pages", async () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const required = [
    ["index.html", /Envite Canario/i],
    ["app/index.html", /Abrir WebApp/i],
    ["tienda/index.html", /Baraja Envite Canario/i],
    ["torneos/index.html", /Tinajo/i],
    ["clasificacion/index.html", /Clasificación en preparación/i],
    ["normas-y-variantes/index.html", /6 contra 6/i],
    ["historia/index.html", /procedencia exacta no está demostrada/i],
    ["noticias/index.html", /Noticias de Envite Canario/i],
    ["privacidad/index.html", /Privacidad/i],
    ["informacion-legal/index.html", /Información del proyecto/i],
    ["tienda/baraja-envite-canario/index.html", /Diseño y prototipo/i],
    ["noticias/webapp-envite-canario-beta-publica/index.html", /beta pública/i],
  ];

  for (const [path, pattern] of required) {
    const html = await exportedHtml(path);
    assert.match(html, pattern, `${path} missing expected content`);
    assert.doesNotMatch(html, /\.\.\.|…/, `${path} contains ellipses`);
  }

  const home = await exportedHtml("index.html");
  assert.match(home, new RegExp(`${escapedPattern(basePath)}/_next/`));
  assert.match(
    home,
    new RegExp(`${escapedPattern(basePath)}/images/envite-shop-collection-v01\\.png`),
  );
});

test("exports the WebApp shell under the public domain", async () => {
  const index = await exportedHtml("webapp/index.html");
  const manifest = await exportedHtml("webapp/manifest.json");

  assert.match(index, /<base href="\/webapp\/">/i);
  assert.match(index, /Envite Canario Beta/i);
  assert.match(manifest, /Envite Canario Beta/i);
});

test("exports crawlable metadata and excludes the application shell", async () => {
  const robots = await exportedHtml("robots.txt");
  const sitemap = await exportedHtml("sitemap.xml");
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://envitecanario.es";

  assert.match(robots, /Disallow: \/webapp\//i);
  assert.match(robots, /Sitemap:/i);
  assert.match(sitemap, new RegExp(escapedPattern(siteUrl)));
  assert.match(sitemap, /\/tienda<\/loc>/i);
  assert.match(sitemap, /\/torneos<\/loc>/i);
  assert.doesNotMatch(sitemap, /\/webapp\/?<\/loc>/i);
});