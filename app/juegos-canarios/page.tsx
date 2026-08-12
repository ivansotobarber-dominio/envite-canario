import type { Metadata } from "next";
import Link from "next/link";
import { assetPath } from "../../lib/site";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Juegos Canarios, memoria que se juega",
  description: "Juegos Canarios es una ventana cultural en construccion: Envite, Lucha Canaria, Bola Canaria, Salto del Pastor y Juego del Palo, tratados con fuentes, voces y respeto por cada practica.",
  alternates: { canonical: "/juegos-canarios" },
};

const games = [
  { name: "Envite Canario", state: "Activo", copy: "La primera mesa digital del proyecto. Juego, aprendizaje y archivo cultural alrededor de una practica viva.", href: "/app", accent: "retro-game-envite" },
  { name: "Lucha Canaria", state: "Archivo inicial", copy: "Una futura linea editorial para reunir fuentes, voces, escuelas y contexto antes de proponer experiencias propias.", href: "#proximamente", accent: "retro-game-lucha" },
  { name: "Bola Canaria", state: "Investigacion", copy: "Territorio, tecnica de plaza y memoria de clubes, tratada como practica deportiva y social antes que como decoracion.", href: "#proximamente", accent: "retro-game-bola" },
  { name: "Salto del Pastor", state: "Investigacion", copy: "Conocimiento del paisaje y practica con exigencias de seguridad. No se simplificara ni se gamificara sin contraste experto.", href: "#proximamente", accent: "retro-game-salto" },
  { name: "Juego del Palo", state: "Investigacion", copy: "Garrote canario, fundamentos, escuelas y transmision. El proyecto empezara por documentacion y colaboracion responsable.", href: "#proximamente", accent: "retro-game-palo" },
];

export default function JuegosCanariosPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1}>
        <section className="juegos-retro-hero" aria-labelledby="juegos-title">
          {/* Static local artwork avoids a runtime image-optimizer dependency on the public site. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Panorama ilustrado de juegos tradicionales canarios con borde de telar"
            className="juegos-retro-image"
            src={assetPath("/images/juegos-canarios-retro-telar-reference-v04.png")}
          />
          <div className="juegos-retro-shade" aria-hidden="true" />
          <div className="section-inner juegos-retro-hero-content">
            <p className="eyebrow">Juegos Canarios</p>
            <h1 id="juegos-title">La cultura que se juega tiene futuro.</h1>
            <p>Una ventana editorial para investigar, contar y acercar los juegos tradicionales canarios a nuevas generaciones sin convertir su historia en atrezzo.</p>
            <div className="juegos-retro-actions">
              <Link className="button button-primary" href="/app">Jugar al Envite</Link>
              <a className="button button-quiet" href="#mapa">Ver las cinco lineas</a>
            </div>
          </div>
        </section>

        <section className="juegos-manifesto" aria-labelledby="manifesto-title">
          <div className="section-inner">
            <p className="eyebrow">Principio de trabajo</p>
            <h2 id="manifesto-title">Conservar no es dejar quieto. Es dar una forma honesta de seguir practicando.</h2>
            <p>La primera fase no pretende hablar en nombre de todas las islas, escuelas o jugadores. Busca escuchar, documentar con atribucion y abrir una puerta clara para que cada practica tenga un lugar digital digno.</p>
          </div>
        </section>

        <section className="juegos-map" id="mapa" aria-labelledby="map-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Cinco lineas, un archivo vivo</p>
              <h2 id="map-title">Elige una mesa, una plaza o un camino.</h2>
              <p>Solo Envite esta abierto para jugar. Las demas lineas aparecen como archivos en construccion hasta que existan fuentes, colaboraciones y una propuesta propia que aporte valor.</p>
            </div>
            <div className="retro-games-grid">
              {games.map((game, index) => (
                <article className={`retro-game-card ${game.accent}`} key={game.name}>
                  <span className="retro-game-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="retro-game-state">{game.state}</span>
                  <h3>{game.name}</h3>
                  <p>{game.copy}</p>
                  {game.href === "/app" ? (
                    <Link href={game.href}>Abrir mesa <span aria-hidden="true">→</span></Link>
                  ) : (
                    <a href={game.href}>Conocer la linea <span aria-hidden="true">→</span></a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="juegos-commitment" id="proximamente" aria-labelledby="commitment-title">
          <div className="section-inner">
            <p className="eyebrow">Antes de crecer</p>
            <h2 id="commitment-title">Fuente, contexto y participacion local.</h2>
            <div className="juegos-commitment-grid">
              <div><strong>01</strong><p>Fuentes identificadas y diferencias entre islas o escuelas visibles.</p></div>
              <div><strong>02</strong><p>Voces de practicantes, entidades y personas que conocen la practica.</p></div>
              <div><strong>03</strong><p>Una experiencia digital que ayude a acercarse, no que sustituya la practica real.</p></div>
            </div>
            <Link className="button button-light" href="/fuentes">Ver el criterio editorial</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
