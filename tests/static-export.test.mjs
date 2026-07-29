import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function exportedHtml(path) {
  return readFile(new URL(`../out/${path}`, import.meta.url), "utf8");
}

function escapedPattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("exports the public routes required by GitHub Pages", async () => {
  const home = await exportedHtml("index.html");
  const privacy = await exportedHtml("privacidad/index.html");
  const legal = await exportedHtml("informacion-legal/index.html");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  assert.match(home, /<h1[^>]*>Envite Canario<\/h1>/i);
  assert.match(home, new RegExp(`${escapedPattern(basePath)}/_next/`));
  assert.match(
    home,
    new RegExp(`${escapedPattern(basePath)}/images/envite-table\\.png`),
  );
  assert.doesNotMatch(home, /\.\.\.|\u2026/);
  assert.match(privacy, /sin captaci\u00f3n de datos/i);
  assert.match(legal, /proyecto independiente en desarrollo/i);
});

test("exports crawlable metadata endpoints", async () => {
  const robots = await exportedHtml("robots.txt");
  const sitemap = await exportedHtml("sitemap.xml");
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://example.invalid/envite-canario";

  assert.match(robots, /Sitemap:/);
  assert.match(sitemap, new RegExp(escapedPattern(siteUrl)));
});