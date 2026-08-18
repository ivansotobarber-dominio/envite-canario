import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { newsPosts } from "./content";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { assetPath, siteUrl } from "../lib/site";
import { IslandPortal } from "./island-portal";
import { JuegosCanariosBand } from "./juegos-canarios-band";
import { MilloCounterDemo } from "./millo-counter-demo";

export const metadata: Metadata = {
  title: "Jugar, tienda, torneos y cultura",
  description:
    "Portal independiente de Envite Canario: WebApp, tienda, torneos populares, clasificación, normas, variantes, glosario, fuentes, noticias e historia.",
  alternates: {
    canonical: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Envite Canario",
      url: `${siteUrl}/`,
      inLanguage: "es",
      description:
        "Portal independiente para jugar, aprender y conservar el Envite Canario.",
    },
    {
      "@type": ["VideoGame", "SoftwareApplication"],
      name: "Envite Canario",
      url: `${siteUrl}/app/`,
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      gamePlatform: "Web browser",
      isAccessibleForFree: true,
      inLanguage: "es",
      description:
        "Juego de cartas en desarrollo para aprender y jugar al Envite Canario.",
    },
  ],
};

const portalLinks = [
  {
    label: "JUGAR",
    title: "WebApp",
    copy: "Entra directamente a la mesa y prueba la beta pública.",
    href: "/app",
    accent: "portal-card-green",
  },
  {
    label: "TIENDA",
    title: "Productos del Envite",
    copy: "Baraja, Pack Mesa, tapete y material para torneos.",
    href: "/tienda",
    accent: "portal-card-sun",
  },
  {
    label: "AGENDA",
    title: "Torneos populares",
    copy: "Convocatorias reales con fuente y fecha de verificación.",
    href: "/torneos",
    accent: "portal-card-ocean",
  },
  {
    label: "COMPETICIÓN",
    title: "Clasificación",
    copy: "Reglamento y resultados trazables cuando estén disponibles.",
    href: "/clasificacion",
    accent: "portal-card-red",
  },
  {
    label: "APRENDER",
    title: "Normas y variantes",
    copy: "Base común y modalidades de 2 contra 2 a 6 contra 6.",
    href: "/normas-y-variantes",
    accent: "portal-card-ink",
  },
  {
    label: "MEMORIA",
    title: "Historia",
    copy: "Fuentes, vocabulario, testimonios y límites de la evidencia.",
    href: "/historia",
    accent: "portal-card-paper",
  },
];

const statusItems = [
  { label: "Portal independiente", value: "Activo" },
  { label: "WebApp", value: "Beta pública" },
  { label: "Tienda", value: "Catálogo abierto" },
  { label: "App Store y Google Play", value: "En preparación" },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />

      <main id="contenido-principal" tabIndex={-1}>
        <section
          className="hero"
          aria-labelledby="hero-title"
          style={{
            backgroundImage: `url("${assetPath("/images/envite-hero.webp")}")`,
          }}
        >
          <video
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={assetPath("/images/envite-mesa-atlantica-reference-v02.png")}
            aria-hidden="true"
          >
            <source src={assetPath("/videos/envite-mesa-atlantica-loop-v01.mp4")} type="video/mp4" />
          </video>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-inner">
            <p className="status-kicker">La mesa canaria, también en digital</p>
            <h1 id="hero-title">Envite Canario</h1>
            <p className="hero-claim">Jugar. Aprender. Conservar la mesa.</p>
            <p className="hero-copy">
              Una aplicación para jugar, una tienda nacida alrededor de la mesa
              y un portal para seguir torneos, normas, historia y comunidad.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/app">
                Jugar en la WebApp
              </Link>
              <Link className="button button-quiet" href="/tienda">
                Entrar en la tienda
              </Link>
            </div>
          </div>
          <a className="hero-next" href="#portal" aria-label="Ver todo el portal">
            Explorar
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="portal-nav-band" id="portal" aria-labelledby="portal-title">
          <div className="section-inner">
            <div className="section-heading portal-heading">
              <p className="eyebrow">Todo Envite Canario</p>
              <h2 id="portal-title">De la primera mano a la próxima romería.</h2>
              <p>
                El juego es el núcleo. La tienda, los torneos y el archivo cultural
                permiten que la mesa exista también fuera de la pantalla.
              </p>
            </div>
            <div className="portal-grid">
              {portalLinks.map((item) => (
                <Link className={`portal-card ${item.accent}`} href={item.href} key={item.href}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <strong aria-hidden="true">→</strong>
                </Link>
              ))}
            </div>
            <div className="knowledge-rail">
              <div>
                <span>Guía de referencia</span>
                <strong>Aprender con contexto y fuentes visibles.</strong>
              </div>
              <nav className="knowledge-links" aria-label="Guías de Envite Canario">
                <Link href="/como-jugar">Cómo jugar</Link>
                <Link href="/glosario">Glosario</Link>
                <Link href="/fuentes">Fuentes consultadas</Link>
              </nav>
            </div>
          </div>
        </section>

        <IslandPortal />

        <JuegosCanariosBand />

        <section className="home-shop-band" aria-labelledby="home-shop-title">
          <div className="home-shop-image">
            <Image
              src={assetPath("/images/envite-shop-collection-commercial-v05.webp")}
              alt="Colección física conceptual de Envite Canario con cajas, mazos precintados, camiseta, tapete funcional y marcador de millos"
              width={1672}
              height={941}
              loading="eager"
              unoptimized
            />
          </div>
          <div className="home-shop-copy">
            <p className="eyebrow">Tienda Envite Canario</p>
            <h2 id="home-shop-title">La primera colección empieza por jugar mejor.</h2>
            <p>
              La colección comienza por una mesa completa: baraja con dorso de
              Pintadera de Guía, tapete de Envite, marcador de millos y material
              para organizar torneos populares. El catálogo ya está abierto,
              aunque las compras todavía no.
            </p>
            <div className="millos-counter-spotlight">
              <Image
                src={assetPath("/images/envite-millos-counter-v01.png")}
                alt="Prototipo conceptual de un marcador de millos de madera para Envite Canario"
                width={1680}
                height={945}
                unoptimized
              />
              <div>
                <span>05 · Tanteo de mesa</span>
                <strong>Marcador de Millos</strong>
                <p>
                  Una pieza de correderas para arrayar envites y manos, sin millos
                  sueltos ni cuentas de memoria.
                </p>
              </div>
            </div>
            <MilloCounterDemo />
            <ul className="shop-short-list">
              <li>Baraja Envite Canario</li>
              <li>Pack Mesa completo</li>
              <li>Tapete de juego</li>
              <li>Marcador de Millos</li>
              <li>Kit Torneo Popular</li>
            </ul>
            <Link className="button button-dark" href="/tienda">
              Ver la tienda
            </Link>
          </div>
        </section>

        <section className="status-band" id="estado" aria-labelledby="status-title">
          <div className="section-inner">
            <div className="section-heading compact-heading">
              <p className="eyebrow">Estado real</p>
              <h2 id="status-title">Cada enlace dice exactamente qué está disponible.</h2>
            </div>
            <div className="status-grid">
              {statusItems.map((item) => (
                <div className="status-item" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="project-band" aria-labelledby="project-title">
          <div className="section-inner project-layout">
            <div className="project-copy">
              <p className="eyebrow">La mesa es el producto</p>
              <h2 id="project-title">Primero, una partida que cualquiera pueda entender.</h2>
              <p>
                La WebApp permite entrar ya a la mesa. La prioridad del motor es
                que una persona nueva pueda jugar una mano, entender por qué ganó
                o perdió y querer repetir.
              </p>
              <ul className="check-list">
                <li>Entrada directa, sin registro obligatorio.</li>
                <li>Mesa horizontal y sin scroll en la app instalada.</li>
                <li>Ayuda dentro de la jugada, no antes.</li>
                <li>Modalidades previstas de 2 contra 2 a 6 contra 6.</li>
              </ul>
              <Link className="button button-dark" href="/app">
                Abrir acceso a la app
              </Link>
            </div>
            <figure className="product-figure">
              <Image
                src={assetPath("/images/envite-table.webp")}
                alt="Mesa horizontal de Envite Canario con jugadores, cartas y decisiones centrales"
                width={1672}
                height={941}
                sizes="(max-width: 900px) 100vw, 54vw"
                priority
                unoptimized
              />
              <figcaption>
                Beta en evolución. La interfaz y el motor todavía reciben cambios.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="culture-dual-band" aria-labelledby="culture-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Una tradición con muchas mesas</p>
              <h2 id="culture-title">Del guachinche al puerto.</h2>
              <p>
                El lenguaje visual del proyecto une campo, pueblo, romería, costa
                y sociedades populares sin convertir Canarias en decoración.
              </p>
            </div>
            <div className="culture-dual-grid">
              <article>
                <Image
                  src={assetPath("/images/envite-community-guachinche-v01.webp")}
                  alt="Representación editorial de una partida en un guachinche durante una romería"
                  width={1680}
                  height={945}
                  unoptimized
                />
                <div>
                  <span>PUEBLO Y CAMPO</span>
                  <h3>Guachinche, familia y romería</h3>
                  <p>La transmisión ocurre mirando, jugando y corrigiendo alrededor de la mesa.</p>
                </div>
              </article>
              <article>
                <Image
                  src={assetPath("/images/envite-tournament-harbour-v01.webp")}
                  alt="Representación editorial de un torneo popular junto a un puerto canario"
                  width={1680}
                  height={945}
                  unoptimized
                />
                <div>
                  <span>PUERTO Y COSTA</span>
                  <h3>Sociedades, barrios y torneos</h3>
                  <p>La competición popular conecta equipos, fiestas y memoria local.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="home-tournament-band" aria-labelledby="home-tournament-title">
          <div className="section-inner home-tournament-layout">
            <div>
              <p className="eyebrow">Próxima convocatoria verificada</p>
              <h2 id="home-tournament-title">Envite 2 contra 2 en Tinajo.</h2>
              <p>
                1 de agosto de 2026, a las 20:00, en los ventorrillos de las
                Fiestas de San Roque. Fuente: Ayuntamiento de Tinajo.
              </p>
            </div>
            <Link className="button button-primary" href="/torneos">
              Ver calendario
            </Link>
          </div>
        </section>

        <section className="home-news-band" aria-labelledby="home-news-title">
          <div className="section-inner">
            <div className="section-heading news-heading-row">
              <div>
                <p className="eyebrow">Actualidad</p>
                <h2 id="home-news-title">Lo último de Envite Canario.</h2>
              </div>
              <Link className="text-link" href="/noticias">
                Ver todas las noticias
              </Link>
            </div>
            <div className="home-news-grid">
              {newsPosts.slice(0, 3).map((post) => (
                <article key={post.slug}>
                  <div className="news-meta">
                    <span>{post.category}</span>
                    <time dateTime={post.isoDate}>{post.published}</time>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                  <Link className="text-link" href={`/noticias/${post.slug}`}>
                    Leer
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="social-band" id="redes" aria-labelledby="social-title">
          <div className="section-inner social-layout">
            <div className="section-heading">
              <p className="eyebrow">Redes del proyecto</p>
              <h2 id="social-title">Cuatro canales, una identidad coherente.</h2>
              <p>
                Instagram, Facebook, X y YouTube están en preparación. Ninguna
                cuenta se enlazará hasta que esté creada, protegida y conectada
                con el canal propio del proyecto.
              </p>
              <Link className="text-link" href="/redes-sociales">
                Ver el estado de las redes
              </Link>
            </div>
            <div className="social-list" aria-label="Redes sociales previstas">
              {["Instagram", "Facebook", "X", "YouTube"].map((network) => (
                <div key={network}>
                  <span className="network">{network}</span>
                  <strong>En preparación</strong>
                  <small>Enlace pendiente</small>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

