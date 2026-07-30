import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { assetPath } from "../../lib/site";

export const metadata: Metadata = {
  title: "Redes sociales del proyecto Envite Canario",
  description:
    "Estado de las cuentas del proyecto Envite Canario en Instagram, Facebook, X y YouTube, todavía en preparación y sin enlaces públicos.",
  alternates: {
    canonical: "/redes-sociales",
  },
};

const networks = [
  {
    id: "instagram",
    mark: "IG",
    name: "Instagram",
    purpose: "Imágenes de la mesa, señas, productos, torneos y vida del proyecto.",
  },
  {
    id: "facebook",
    mark: "f",
    name: "Facebook",
    purpose: "Comunidad, convocatorias, asociaciones, fiestas y encuentros presenciales.",
  },
  {
    id: "x",
    mark: "X",
    name: "X",
    purpose: "Novedades breves, resultados, agenda y conversación sobre el Envite.",
  },
  {
    id: "youtube",
    mark: "YT",
    name: "YouTube",
    purpose: "Tutoriales, partidas comentadas, entrevistas y memoria audiovisual.",
  },
];

export default function SocialNetworksPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1}>
        <section className="social-network-hero">
          <div className="social-network-hero-copy">
            <p className="eyebrow">Comunidad del proyecto</p>
            <h1>La conversación empieza en la mesa.</h1>
            <p>
              Preparamos cuatro cuentas para compartir juego, cultura, torneos y
              novedades. Los enlaces solo se activarán cuando cada perfil esté
              creado, protegido y conectado con este dominio.
            </p>
          </div>
          <figure className="social-network-hero-media">
            <Image
              src={assetPath("/images/envite-community-guachinche-v01.webp")}
              alt="Jugadores de Envite reunidos en un ambiente canario de guachinche y romería"
              width={1536}
              height={1024}
              priority
              unoptimized
            />
          </figure>
        </section>

        <section className="social-network-band" aria-labelledby="social-network-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Canales en construcción</p>
              <h2 id="social-network-title">Cuatro perfiles, una identidad.</h2>
              <p>
                <strong>envitecanario.es</strong> es el canal propio del proyecto Envite Canario.
                El proyecto es independiente y no representa a una autoridad
                institucional del juego.
              </p>
            </div>
            <div className="social-network-grid">
              {networks.map((network) => (
                <article id={network.id} key={network.id} className="social-network-card">
                  <span className={`social-network-mark social-network-mark-${network.id}`} aria-hidden="true">
                    {network.mark}
                  </span>
                  <div>
                    <p className="product-status">Cuenta del proyecto en preparación</p>
                    <h3>{network.name}</h3>
                    <p>{network.purpose}</p>
                    <small className="social-verification">Verificación pendiente</small>
                  </div>
                  <span
                    className="store-disabled"
                    aria-label={`El enlace de ${network.name} todavía no está disponible`}
                  >
                    Enlace pendiente
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="social-crosslinks" aria-labelledby="social-crosslinks-title">
          <div className="section-inner social-crosslinks-inner">
            <div>
              <p className="eyebrow">Mientras tanto</p>
              <h2 id="social-crosslinks-title">El proyecto ya se puede recorrer aquí.</h2>
            </div>
            <nav aria-label="Otras páginas de Envite Canario">
              <Link className="button button-primary" href="/app">Jugar</Link>
              <Link className="button button-quiet" href="/como-jugar">Cómo jugar</Link>
              <Link className="button button-quiet" href="/torneos">Ver torneos</Link>
              <Link className="button button-quiet" href="/fuentes">Consultar fuentes</Link>
            </nav>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}