import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function exportedHtml(path) {
  return readFile(new URL(`../out/${path}`, import.meta.url), "utf8");
}

test("exports the public routes required by GitHub Pages", async () => {
  const home = await exportedHtml("index.html");
  const privacy = await exportedHtml("privacidad/index.html");
  const legal = await exportedHtml("informacion-legal/index.html");

  assert.match(home, /<h1[^>]*>Envite Canario<\/h1>/i);
  assert.match(home, /\/envite-canario\/_next\//);
  assert.match(home, /\/envite-canario\/images\/envite-table\.png/);
  assert.doesNotMatch(home, /\.\.\.|…/);
  assert.match(privacy, /sin captaci[oó]n de datos/i);
  assert.match(legal, /proyecto independiente en desarrollo/i);
});

test("exports crawlable metadata endpoints", async () => {
  const robots = await exportedHtml("robots.txt");
  const sitemap = await exportedHtml("sitemap.xml");

  assert.match(robots, /Sitemap:/);
  assert.match(sitemap, /envite-canario/);
});