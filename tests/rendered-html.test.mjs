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
  "/torneos/envite-2-contra-2-tinajo-2026",
  "/clasificacion",
  "/como-jugar",
  "/normas-y-variantes",
  "/glosario",
  "/historia",
  "/juegos",
  "/juegos/envite-canario",
  "/fuentes",
  "/noticias",
  "/redes-sociales",
  "/privacidad",
  "/informacion-legal",
];

const navigationRoutes = [
  "/app",
  "/tienda",
  "/torneos",
  "/clasificacion",
  "/como-jugar",
  "/normas-y-variantes",
  "/glosario",
  "/historia",
  "/juegos",
  "/noticias",
  "/fuentes",
  "/redes-sociales",
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

test("exposes a compact internal directory and independent project identity", async () => {
  const home = await htmlFor("/");

  for (const route of navigationRoutes) {
    assert.match(home, new RegExp(`href="${route}"`), `missing navigation link ${route}`);
  }

  assert.match(home, /Portal independiente/i);
  assert.match(home, /Proyecto Envite Canario/i);
  assert.match(home, /href="#contenido-principal"/i);
  assert.match(home, /<main[^>]+id="contenido-principal"[^>]*>/i);
  assert.doesNotMatch(home, /Portal oficial|Canales oficiales|Cuenta oficial|web oficial/i);
});

test("keeps native apps out of structured availability until publication", async () => {
  const home = await htmlFor("/");
  const match = home.match(
    /<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/is,
  );

  assert.ok(match, "home must expose JSON-LD");
  assert.match(match[1], /"operatingSystem":"Web"/i);
  assert.match(match[1], /"gamePlatform":"Web browser"/i);
  assert.doesNotMatch(match[1], /iOS|Android/i);
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
  const event = await htmlFor("/torneos/envite-2-contra-2-tinajo-2026");
  const ranking = await htmlFor("/clasificacion");

  assert.match(tournaments, /Tinajo/i);
  assert.match(tournaments, /href="\/torneos\/envite-2-contra-2-tinajo-2026"/i);
  assert.match(event, /2026-08-01T20:00:00\+01:00/i);
  assert.match(event, /Ayuntamiento de Tinajo/i);
  assert.match(event, /"@type":"Event"/i);
  assert.match(event, /"sameAs":"https:\/\/www\.tinajo\.es\/noticias\/campeonatos-tradicionales-san-roque-0"/i);
  assert.match(tournaments, /El Palmar/i);
  assert.match(tournaments, /todavía no publica día ni hora/i);
  assert.match(ranking, /Reglamento antes que ranking/i);
  assert.match(ranking, /Sin resultados publicados/i);
});

test("connects rules and history to guides, glossary and the source index", async () => {
  const rules = await htmlFor("/normas-y-variantes");
  const history = await htmlFor("/historia");

  for (const mode of ["2 contra 2", "3 contra 3", "4 contra 4", "5 contra 5", "6 contra 6"]) {
    assert.match(rules, new RegExp(mode));
  }
  assert.match(history, /La procedencia exacta no está demostrada/i);
  assert.match(history, /Memoria oral/i);

  for (const html of [rules, history]) {
    assert.match(html, /href="\/como-jugar"/i);
    assert.match(html, /href="\/glosario"/i);
    assert.match(html, /href="\/fuentes"/i);
  }
});

test("exposes a sourced and searchable Wiki without promoting future videogames", async () => {
  const wiki = await htmlFor("/juegos");
  const envite = await htmlFor("/juegos/envite-canario");

  assert.match(wiki, /Wiki de Juegos Canarios/i);
  assert.match(wiki, /Chapolín Canario/i);
  assert.match(wiki, /Juegos infantiles/i);
  assert.match(wiki, /Sin ficha publica|Sin ficha pública/i);
  assert.match(wiki, /Nombre incorporado como pista documental/i);
  assert.match(envite, /Como se juega|Cómo se juega/i);
  assert.match(envite, /Fuentes y limites|Fuentes y límites/i);
  assert.match(envite, /application\/ld\+json/i);
  assert.doesNotMatch(wiki, /Próximo videojuego|Futuro videojuego|En desarrollo como juego/i);
});

test("offers a direct WebApp route and truthful store-download states", async () => {
  const html = await htmlFor("/app");
  assert.match(html, /href="\/webapp\/"/i);
  assert.match(html, /Apple App Store/i);
  assert.match(html, /Google Play/i);
  assert.match(html, /Enlace pendiente/i);
});

test("keeps social accounts pending without invented profile URLs", async () => {
  const html = await htmlFor("/redes-sociales");

  for (const network of ["Instagram", "Facebook", "X", "YouTube"]) {
    assert.match(html, new RegExp(network));
  }

  assert.match(html, /Cuenta del proyecto en preparación/i);
  assert.match(html, /Verificación pendiente/i);
  assert.match(html, /Enlace pendiente/i);
  assert.match(html, /canal propio del proyecto/i);
  assert.match(html, /no representa a una autoridad institucional/i);
  assert.doesNotMatch(html, /Cuenta oficial|perfil oficial|canal oficial/i);
  assert.doesNotMatch(
    html,
    /https?:\/\/(?:www\.)?(?:instagram\.com|facebook\.com|x\.com|twitter\.com|youtube\.com)/i,
  );
});

test("preserves the social identity restriction in project documentation", async () => {
  const profiles = await readFile(
    new URL("../docs/lanzamiento-social/perfiles.md", import.meta.url),
    "utf8",
  );
  const verification = await readFile(
    new URL("../docs/lanzamiento-social/verificacion-y-seguridad.md", import.meta.url),
    "utf8",
  );

  assert.match(profiles, /No añadir.+oficial.+respaldo institucional/i);
  assert.match(profiles, /Instagram/);
  assert.match(profiles, /Facebook/);
  assert.match(profiles, /\n## X\n/);
  assert.match(verification, /facebook\.com\/legal\/mvb_terms/);
  assert.match(verification, /help\.x\.com/);
  assert.match(verification, /autenticación de dos factores/i);
});
