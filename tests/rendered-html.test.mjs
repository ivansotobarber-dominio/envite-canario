import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", String(Date.now()));
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost" + path, {
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

test("renders the public prelaunch home", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="es">/i);
  assert.match(html, /<h1[^>]*>Envite Canario<\/h1>/i);
  assert.match(html, /Prelanzamiento público/i);
  assert.match(html, /Beta privada/i);
  assert.match(html, /Instagram/i);
  assert.match(html, /Facebook/i);
  assert.match(html, />X</i);
  assert.doesNotMatch(html, /Checklist|panel interno|borrador operativo/i);
  assert.doesNotMatch(html, /\.\.\.|…/);
  assert.doesNotMatch(html, /<form\b/i);
});

test("renders privacy and project information routes", async () => {
  const privacy = await render("/privacidad");
  const legal = await render("/informacion-legal");

  assert.equal(privacy.status, 200);
  assert.equal(legal.status, 200);
  assert.match(await privacy.text(), /sin captación de datos/i);
  assert.match(await legal.text(), /proyecto independiente en desarrollo/i);
});

test("keeps social launch copy and official-source checklist", async () => {
  const profiles = await readFile(
    new URL(
      "../docs/lanzamiento-social/perfiles.md",
      import.meta.url,
    ),
    "utf8",
  );
  const verification = await readFile(
    new URL(
      "../docs/lanzamiento-social/verificacion-y-seguridad.md",
      import.meta.url,
    ),
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
