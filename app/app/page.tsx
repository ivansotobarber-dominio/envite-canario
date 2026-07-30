import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { assetPath } from "../../lib/site";

export const metadata: Metadata = {
  title: "Jugar a Envite Canario",
  description:
    "Acceso directo a la WebApp de Envite Canario y estado de las versiones para iPhone y Android.",
  alternates: {
    canonical: "/app",
  },
};

export default function AppAccessPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="app-access-hero">
          <div className="app-access-copy">
            <p className="eyebrow">Jugar ahora</p>
            <h1>Entra directamente a la mesa.</h1>
            <p>
              La WebApp es la vía pública de prueba. Funciona en navegador y
              permite revisar la mesa, las cartas y el flujo local mientras
              preparamos las versiones instaladas.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/webapp/">
                Abrir WebApp
              </a>
              <Link className="button button-quiet" href="/normas-y-variantes">
                Ver normas y variantes
              </Link>
            </div>
            <p className="beta-warning">
              Beta pública de prueba. El motor, la interfaz y las reglas siguen en validación.
            </p>
          </div>
          <figure className="app-access-media">
            <Image
              src={assetPath("/images/envite-table.png")}
              alt="Mesa horizontal de la aplicación Envite Canario"
              width={1672}
              height={941}
              priority
              unoptimized
            />
          </figure>
        </section>

        <section className="download-band" aria-labelledby="download-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Tres vías de acceso</p>
              <h2 id="download-title">Web disponible, tiendas en preparación.</h2>
              <p>
                Los enlaces de Apple y Google se activarán cuando exista una
                ficha publicada y una build aprobada. Hasta entonces no
                mostraremos botones que lleven a una página inexistente.
              </p>
            </div>
            <div className="download-grid">
              <article className="download-card download-card-live">
                <span className="platform-mark">WEB</span>
                <div>
                  <p className="product-status">Disponible</p>
                  <h3>WebApp</h3>
                  <p>Acceso inmediato desde Safari, Chrome, Edge o Firefox.</p>
                </div>
                <a className="button button-dark" href="/webapp/">
                  Abrir ahora
                </a>
              </article>
              <article className="download-card">
                <span className="platform-mark">iOS</span>
                <div>
                  <p className="product-status">Próximamente</p>
                  <h3>Apple App Store</h3>
                  <p>Primero TestFlight, después publicación para iPhone.</p>
                </div>
                <span className="store-disabled" aria-label="Enlace de App Store todavía no disponible">
                  Enlace pendiente
                </span>
              </article>
              <article className="download-card">
                <span className="platform-mark">AND</span>
                <div>
                  <p className="product-status">Próximamente</p>
                  <h3>Google Play</h3>
                  <p>Build Android en validación antes de abrir la ficha pública.</p>
                </div>
                <span className="store-disabled" aria-label="Enlace de Google Play todavía no disponible">
                  Enlace pendiente
                </span>
              </article>
            </div>
          </div>
        </section>

        <section className="install-band" aria-labelledby="install-title">
          <div className="section-inner install-layout">
            <div>
              <p className="eyebrow">Acceso rápido en el móvil</p>
              <h2 id="install-title">La WebApp puede vivir en tu pantalla de inicio.</h2>
            </div>
            <div className="install-steps">
              <article>
                <span>iPhone</span>
                <p>
                  Abre la WebApp en Safari, pulsa Compartir y elige Añadir a pantalla de inicio.
                </p>
              </article>
              <article>
                <span>Android</span>
                <p>
                  Abre la WebApp en Chrome y usa Instalar aplicación o Añadir a pantalla de inicio.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
