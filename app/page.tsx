import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { assetPath, siteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: "Envite Canario | App, cultura, torneos y comunidad",
  description:
    "Prelanzamiento de Envite Canario: una app para aprender y jugar, una comunidad conectada con torneos y una futura tienda de productos del juego.",
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
        "Proyecto independiente para aprender, jugar y conservar el Envite Canario.",
    },
    {
      "@type": "VideoGame",
      name: "Envite Canario",
      url: siteUrl,
      applicationCategory: "GameApplication",
      operatingSystem: "Web, iOS, Android",
      gamePlatform: ["Web", "iOS", "Android"],
      inLanguage: "es",
      description:
        "Juego de cartas en desarrollo para aprender y jugar al Envite Canario.",
    },
  ],
};

const statusItems = [
  { label: "Web pública", value: "Prelanzamiento" },
  { label: "App", value: "Beta privada" },
  { label: "Reglas y señas", value: "En contraste" },
  { label: "Torneos y tienda", value: "Siguiente fase" },
];

const pillars = [
  {
    index: "01",
    title: "Jugar sin fricción",
    copy: "Mesa horizontal, turnos claros y una decisión principal en cada momento.",
  },
  {
    index: "02",
    title: "Aprender jugando",
    copy: "Ayuda contextual y explicaciones breves dentro de la partida, no antes.",
  },
  {
    index: "03",
    title: "Conservar con rigor",
    copy: "Reglas, señas y variantes documentadas sin convertir una costumbre local en norma universal.",
  },
];

const roadmap = [
  {
    phase: "Ahora",
    title: "Presencia pública",
    copy: "Web oficial, identidad coherente y apertura de Instagram, Facebook y X.",
  },
  {
    phase: "Producto",
    title: "App local sólida",
    copy: "Primera mano guiada, partidas contra la máquina y experiencia móvil sin scroll.",
  },
  {
    phase: "Comunidad",
    title: "Mesas y torneos",
    copy: "Agenda presencial, validación con jugadores y contenidos culturales trazables.",
  },
  {
    phase: "Escala",
    title: "Online y productos",
    copy: "Partidas conectadas, eventos digitales, cartas y artículos vinculados al juego.",
  },
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
            <p className="status-kicker">Prelanzamiento público</p>
            <h1 id="hero-title">Envite Canario</h1>
            <p className="hero-claim">Jugar. Aprender. Conservar la mesa.</p>
            <p className="hero-copy">
              Estamos creando una app clara y cercana para aprender y jugar al
              Envite Canario, conectada con su cultura, sus mesas y sus torneos.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#proyecto">
                Conocer el proyecto
              </a>
              <a className="button button-quiet" href="#redes">
                Seguir el lanzamiento
              </a>
            </div>
          </div>
          <a className="hero-next" href="#estado" aria-label="Ir al estado del proyecto">
            Estado actual
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="status-band" id="estado" aria-labelledby="status-title">
          <div className="section-inner">
            <div className="section-heading compact-heading">
              <p className="eyebrow">Estado real</p>
              <h2 id="status-title">Estamos saliendo, sin vender humo.</h2>
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

        <section className="project-band" id="proyecto" aria-labelledby="project-title">
          <div className="section-inner project-layout">
            <div className="project-copy">
              <p className="eyebrow">La mesa es el producto</p>
              <h2 id="project-title">
                Primero, una partida que cualquiera pueda entender.
              </h2>
              <p>
                La prioridad es que una persona nueva pueda entrar, jugar su primera
                mano y comprender qué ha ocurrido. La app sigue en beta privada
                mientras afinamos la mesa, el ritmo y las decisiones.
              </p>
              <ul className="check-list">
                <li>Entrada rápida, sin registro obligatorio.</li>
                <li>Juego horizontal y sin scroll en la app instalada.</li>
                <li>Ayuda en el momento exacto, no un manual interminable.</li>
                <li>Reglas y variantes diferenciadas con prudencia.</li>
              </ul>
              <span className="availability">Acceso público a la app: todavía no abierto</span>
            </div>
            <figure className="product-figure">
              <Image
                src={assetPath("/images/envite-table.png")}
                alt="Visión horizontal de la mesa de Envite Canario con jugadores, cartas y zona central de decisiones"
                width={1672}
                height={941}
                sizes="(max-width: 900px) 100vw, 54vw"
                priority
                unoptimized
              />
              <figcaption>
                Dirección visual del producto. La interfaz jugable continúa evolucionando.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="pillars-band" aria-labelledby="pillars-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Criterios de producto</p>
              <h2 id="pillars-title">Una app sencilla por fuera y seria por dentro.</h2>
            </div>
            <div className="pillar-grid">
              {pillars.map((pillar) => (
                <article className="pillar-card" key={pillar.index}>
                  <span>{pillar.index}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ecosystem-band" aria-labelledby="ecosystem-title">
          <div className="section-inner">
            <div className="section-heading ecosystem-heading">
              <p className="eyebrow">Más que una app</p>
              <h2 id="ecosystem-title">Un proyecto que vuelve siempre a la mesa real.</h2>
              <p>
                El juego móvil es el núcleo. A su alrededor crecerán una referencia
                digital sobre el Envite, la comunidad, los torneos y una tienda de
                productos físicos cuando el producto esté preparado.
              </p>
            </div>
            <div className="ecosystem-grid">
              <article>
                <span>APP</span>
                <h3>Jugar y aprender</h3>
                <p>Partidas locales primero. Juego conectado cuando la base sea sólida.</p>
              </article>
              <article>
                <span>COMUNIDAD</span>
                <h3>Mesas y torneos</h3>
                <p>Agenda presencial, colaboración con jugadores y futuros eventos digitales.</p>
              </article>
              <article>
                <span>TIENDA</span>
                <h3>Productos del Envite</h3>
                <p>Barajas, material de juego y artículos temáticos en una fase comercial posterior.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="roadmap-band" id="hoja-de-ruta" aria-labelledby="roadmap-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Hoja de ruta</p>
              <h2 id="roadmap-title">Salir pronto, aprender y escalar con orden.</h2>
            </div>
            <ol className="roadmap">
              {roadmap.map((item, index) => (
                <li key={item.title}>
                  <div className="roadmap-marker">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <span>{item.phase}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="community-band" id="comunidad" aria-labelledby="community-title">
          <div
            className="community-image"
            aria-hidden="true"
            style={{
              backgroundImage: `url("${assetPath("/images/envite-welcome.png")}")`,
            }}
          />
          <div className="section-inner community-inner">
            <p className="eyebrow">Tradición viva</p>
            <h2 id="community-title">No vamos a decidir las reglas desde un despacho.</h2>
            <p>
              El Envite cambia con la isla, el municipio y la costumbre de cada mesa.
              Contrastaremos las reglas, las señas y el vocabulario con jugadores y
              fuentes identificables antes de presentarlos como referencia general.
            </p>
            <a className="button button-primary" href="#redes">
              Seguir la fase de contraste
            </a>
          </div>
        </section>

        <section className="social-band" id="redes" aria-labelledby="social-title">
          <div className="section-inner social-layout">
            <div className="section-heading">
              <p className="eyebrow">Canales oficiales</p>
              <h2 id="social-title">La conversación empieza en tres redes.</h2>
              <p>
                Usaremos el mismo nombre, identidad visual y enlace oficial en
                Instagram, Facebook y X. Las cuentas se enlazarán aquí cuando estén
                reservadas y protegidas.
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

        <section className="closing-band" aria-labelledby="closing-title">
          <div className="section-inner closing-inner">
            <Image
              className="closing-icon"
              src={assetPath("/images/envite-icon.png")}
              alt=""
              width={180}
              height={180}
              unoptimized
            />
            <div>
              <p className="eyebrow">Envite Canario</p>
              <h2 id="closing-title">Una mesa canaria preparada para seguir jugando.</h2>
              <p>
                Proyecto independiente en fase de prelanzamiento. Sin registro,
                pagos, publicidad ni recogida de datos personales en esta versión.
              </p>
            </div>
            <Link className="button button-dark" href="/privacidad">
              Ver privacidad
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
