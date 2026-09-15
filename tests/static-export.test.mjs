import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
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
    ["torneos/envite-2-contra-2-tinajo-2026/index.html", /Datos verificados/i],
    ["clasificacion/index.html", /Clasificación en preparación/i],
    ["como-jugar/index.html", /Cómo jugar/i],
    ["normas-y-variantes/index.html", /6 contra 6/i],
    ["glosario/index.html", /Glosario/i],
    ["historia/index.html", /procedencia exacta no está demostrada/i],
    ["juegos/index.html", /Wiki de Juegos Canarios/i],
    ["juegos/envite-canario/index.html", /Fuentes y limites|Fuentes y límites/i],
    ["juegos-canarios/index.html", /Wiki de Juegos Canarios/i],
    ["fuentes/index.html", /Fuentes/i],
    ["noticias/index.html", /Noticias de Envite Canario/i],
    ["redes-sociales/index.html", /Cuenta del proyecto en preparación/i],
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
    new RegExp(`${escapedPattern(basePath)}/images/envite-shop-collection-v01\\.webp`),
  );
  assert.match(home, /Instagram/i);
  assert.match(home, /Facebook/i);
  assert.match(home, />X</i);
  assert.match(home, /YouTube/i);
  assert.match(home, /href="\/redes-sociales\/?"/i);
  assert.match(home, /envite-icon\.webp/i);
  assert.match(home, /envite-hero\.webp/i);
  assert.match(home, /envite-table\.webp/i);
  assert.match(home, /envite-tournament-harbour-v01\.webp/i);
  assert.match(home, /envite-community-guachinche-v01\.webp/i);
  assert.doesNotMatch(
    home,
    /envite-(?:icon|hero|table|tournament-harbour-v01|community-guachinche-v01|shop-collection-v01)\.png/i,
  );
});

test("exports the WebApp shell under the public domain", async () => {
  const index = await exportedHtml("webapp/index.html");
  const manifest = await exportedHtml("webapp/manifest.json");

  assert.match(index, /<base href="\/webapp\/">/i);
  assert.match(index, /Envite Canario Beta/i);
  assert.match(manifest, /Envite Canario Beta/i);
});

test("exports crawlable metadata for general and OAI search", async () => {
  const robots = await exportedHtml("robots.txt");
  const sitemap = await exportedHtml("sitemap.xml");
  const llms = await exportedHtml("llms.txt");
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://envitecanario.es";

  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /User-Agent: OAI-SearchBot/i);
  assert.match(robots, /Allow: \//i);
  assert.match(robots, /Disallow: \/webapp\//i);
  assert.match(robots, /Sitemap:/i);
  assert.match(sitemap, new RegExp(escapedPattern(siteUrl)));

  for (const route of [
    "/como-jugar",
    "/glosario",
    "/juegos",
    "/juegos/envite-canario",
    "/juegos-canarios",
    "/fuentes",
    "/redes-sociales",
    "/torneos/envite-2-contra-2-tinajo-2026",
  ]) {
    assert.match(sitemap, new RegExp(`${escapedPattern(route)}\\/<\\/loc>`, "i"));
  }

  assert.match(sitemap, /\/tienda\/<\/loc>/i);
  assert.match(sitemap, /\/torneos\/<\/loc>/i);
  assert.doesNotMatch(sitemap, /\/webapp\/?<\/loc>/i);
  assert.match(llms, /Portal independiente/i);
  assert.match(llms, /Fuentes/i);
  assert.match(llms, /No presentar Envite Canario como aplicacion oficial/i);
});

test("keeps navigation, social states and touch targets in the responsive CSS", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /\.nav-menu\s*\{/i);
  assert.match(css, /\.footer-directory\s*\{/i);
  assert.match(css, /\.social-network-grid\s*\{/i);
  assert.match(css, /\.skip-link\s*\{/i);
  assert.match(css, /min-height:\s*44px/i);
  assert.match(css, /envite-welcome\.webp/i);
  assert.doesNotMatch(
    css,
    /envite-(?:hero|welcome|community-guachinche-v01)\.png/i,
  );
});

test("exports flat RSC prefetch names for static and dynamic routes", async () => {
  for (const file of [
    "tienda/__next.tienda.__PAGE__.txt",
    "app/__next.app.__PAGE__.txt",
    "noticias/tienda-envite-canario-en-preparacion/__next.noticias.$d$slug.txt",
    "noticias/tienda-envite-canario-en-preparacion/__next.noticias.$d$slug.__PAGE__.txt",
  ]) {
    assert.ok((await exportedHtml(file)).length > 0, file);
  }
});

test("every Windows nested RSC export has a byte-identical flat alias", async () => {
  async function visit(directory, root, parts = []) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const source = join(directory, entry.name);
      if (entry.isDirectory()) {
        if (root) await visit(source, root, [...parts, entry.name]);
        else if (entry.name.startsWith("__next.")) await visit(source, directory, [entry.name]);
        else await visit(source);
      } else if (root && entry.name.endsWith(".txt")) {
        assert.deepEqual(await readFile(source), await readFile(join(root, [...parts, entry.name].join("."))));
      }
    }
  }
  await visit(fileURLToPath(new URL("../out", import.meta.url)));
});
