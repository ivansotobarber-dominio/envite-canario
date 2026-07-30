import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { newsPosts } from "./content";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { assetPath, siteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: "Envite Canario | Jugar, tienda, torneos y cultura",
  description:
    "Portal oficial de Envite Canario: WebApp, tienda, torneos populares, clasificación, normas, variantes, noticias e historia.",
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
      url: siteUrl,
      inLanguage: "es",
      description:
        "Portal independiente para jugar, aprender y conservar el Envite Canario.",
    },
    {
      "@type": "VideoGame",
      name: "Envite Canario",
      url: `${siteUrl}/app`,
      applicationCategory: "GameApplication",
      operatingSystem: "Web, iOS, Android",
      gamePlatform: ["Web", "iOS", "Android"],
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
  { label: "Web oficial", value: "Activa" },
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

      <main>
        <section
          className="hero"
          aria-labelledby="hero-title"
          style={{
            backgroundImage: `url("${assetPath("/images/envite-hero.png")}")`,
          }}
        >
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
          </div>
        </section>

        <section className="home-shop-band" aria-labelledby="home-shop-title">
          <div className="home-shop-image">
            <Image
              src={assetPath("/images/envite-shop-collection-v01.png")}
              alt="Representación conceptual de una colección física de Envite Canario"
              width={1680}
              height={945}
              unoptimized
            />
          </div>
          <div className="home-shop-copy">
            <p className="eyebrow">Tienda Envite Canario</p>
            <h2 id="home-shop-title">La primera colección empieza por jugar mejor.</h2>
            <p>
              La prioridad comercial será una baraja propia. Después vendrán el
              Pack Mesa, el tapete y el material para organizar torneos populares.
              El catálogo ya está abierto, aunque las compras todavía no.
            </p>
            <ul className="shop-short-list">
              <li>Baraja Envite Canario</li>
              <li>Pack Mesa completo</li>
              <li>Tapete y marcador</li>
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
                src={assetPath("/images/envite-table.png")}
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
                  src={assetPath("/images/envite-community-guachinche-v01.png")}
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
                  src={assetPath("/images/envite-tournament-harbour-v01.png")}
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
              <p className="eyebrow">Canales oficiales</p>
              <h2 id="social-title">Una identidad común en tres redes.</h2>
              <p>
                Instagram, Facebook y X usarán el mismo nombre, identidad y enlace
                oficial. Los perfiles se conectarán aquí cuando estén reservados.
              </p>
            </div>
            <div className="social-list" aria-label="Redes sociales previstas">
              <div>
                <span className="network">Instagram</span>
                <strong>@EnviteCanario</strong>
                <small>Apertura en curso</small>
              </div>
              <div>
                <span className="network">Facebook</span>
                <strong>Envite Canario</strong>
                <small>Apertura en curso</small>
              </div>
              <div>
                <span className="network">X</span>
                <strong>@EnviteCanario</strong>
                <small>Apertura en curso</small>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}