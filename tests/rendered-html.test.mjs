import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(path) {
  const response = await render(path);
  assert.equal(response.status, 200, `${path} must render`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

const publicRoutes = [
  "/",
  "/app",
  "/tienda",
  "/torneos",
  "/clasificacion",
  "/normas-y-variantes",
  "/historia",
  "/noticias",
  "/privacidad",
  "/informacion-legal",
];

test("renders the complete Envite Canario portal without visible ellipses", async () => {
  for (const route of publicRoutes) {
    const html = await htmlFor(route);
    assert.match(html, /<html lang="es">/i);
    assert.doesNotMatch(html, /\.\.\.|…/, `${route} contains ellipses`);
  }

  const home = await htmlFor("/");
  assert.match(home, /<h1[^>]*>Envite Canario<\/h1>/i);
  assert.match(home, /Jugar en la WebApp/i);
  assert.match(home, /Entrar en la tienda/i);
  assert.match(home, /Del guachinche al puerto/i);
  assert.match(home, /Envite 2 contra 2 en Tinajo/i);
});

test("keeps the store honest until products, prices and logistics are validated", async () => {
  const html = await htmlFor("/tienda");
  assert.match(html, /Baraja Envite Canario/i);
  assert.match(html, /Pack Mesa Envite Canario/i);
  assert.match(html, /Tapete Envite Canario/i);
  assert.match(html, /Kit Torneo Popular/i);
  assert.match(html, /Esta versión no permite comprar, reservar ni realizar pagos/i);
  assert.doesNotMatch(html, /Añadir al carrito|Comprar ahora|En stock|€|<form\b/i);
});

test("publishes only traceable tournament and ranking information", async () => {
  const tournaments = await htmlFor("/torneos");
  const ranking = await htmlFor("/clasificacion");

  assert.match(tournaments, /Tinajo/i);
  assert.match(tournaments, /2026-08-01T20:00:00\+01:00/i);
  assert.match(tournaments, /Ayuntamiento de Tinajo/i);
  assert.match(tournaments, /El Palmar/i);
  assert.match(tournaments, /todavía no publica día ni hora/i);
  assert.match(ranking, /Reglamento antes que ranking/i);
  assert.match(ranking, /Sin resultados publicados/i);
});

test("publishes sourced rules, variants and history", async () => {
  const rules = await htmlFor("/normas-y-variantes");
  const history = await htmlFor("/historia");

  for (const mode of ["2 contra 2", "3 contra 3", "4 contra 4", "5 contra 5", "6 contra 6"]) {
    assert.match(rules, new RegExp(mode));
  }
  assert.match(rules, /Academia Canaria de la Lengua/i);
  assert.match(history, /La procedencia exacta no está demostrada/i);
  assert.match(history, /Memoria oral/i);
});

test("offers a direct WebApp route and truthful store-download states", async () => {
  const html = await htmlFor("/app");
  assert.match(html, /href="\/webapp\/"/i);
  assert.match(html, /Apple App Store/i);
  assert.match(html, /Google Play/i);
  assert.match(html, /Enlace pendiente/i);
});

test("keeps social launch copy and official-source checklist", async () => {
  const profiles = await readFile(
    new URL("../docs/lanzamiento-social/perfiles.md", import.meta.url),
    "utf8",
  );
  const verification = await readFile(
    new URL("../docs/lanzamiento-social/verificacion-y-seguridad.md", import.meta.url),
    "utf8",
  );

  assert.match(profiles, /@EnviteCanario/);
  assert.match(profiles, /Instagram/);
  assert.match(profiles, /Facebook/);
  assert.match(profiles, /\n## X\n/);
  assert.match(verification, /facebook\.com\/legal\/mvb_terms/);
  assert.match(verification, /help\.x\.com/);
  assert.match(verification, /autenticación de dos factores/i);
});