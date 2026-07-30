import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "../content";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { assetPath, siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Catálogo en preparación de barajas, packs de mesa, tapetes y material para torneos de Envite Canario.",
  alternates: {
    canonical: "/tienda",
  },
  openGraph: {
    title: "Tienda de Envite Canario",
    description:
      "Productos físicos para jugar, regalar y organizar mesas de Envite Canario.",
    url: "/tienda",
    images: ["/images/envite-shop-collection-v01.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tienda de Envite Canario",
  url: `${siteUrl}/tienda`,
  description:
    "Catálogo conceptual de productos físicos de Envite Canario en preparación.",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${siteUrl}/tienda/${product.slug}`,
    })),
  },
};

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main>
        <section className="portal-hero shop-hero">
          <div className="portal-hero-copy">
            <p className="eyebrow">Catálogo en preparación</p>
            <h1>La mesa también se construye fuera de la pantalla.</h1>
            <p>
              Barajas, material de juego y herramientas para torneos. Mostramos
              desde ahora qué estamos desarrollando, sin inventar precios, stock
              ni fechas de entrega.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#catalogo">
                Ver catálogo
              </a>
              <Link className="button button-quiet" href="/noticias/tienda-envite-canario-en-preparacion">
                Cómo saldrá la tienda
              </Link>
            </div>
          </div>
          <figure className="portal-hero-media">
            <Image
              src={assetPath("/images/envite-shop-collection-v01.png")}
              alt="Representación conceptual de una baraja, tapete, marcador y caja de Envite Canario"
              width={1680}
              height={945}
              priority
              unoptimized
            />
            <figcaption>Representación conceptual. Los productos finales pueden cambiar.</figcaption>
          </figure>
        </section>

        <section className="catalog-band" id="catalogo" aria-labelledby="catalog-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Primera colección</p>
              <h2 id="catalog-title">Pocos productos, con una función clara.</h2>
              <p>
                La baraja será el primer producto a validar. El Pack Mesa será la
                experiencia completa y el Kit Torneo preparará el salto a
                asociaciones, fiestas y eventos.
              </p>
            </div>
            <div className="product-grid">
              {products.map((product, index) => (
                <article className="product-card" key={product.slug}>
                  <div className={`product-crop product-crop-${index + 1}`}>
                    <Image
                      src={assetPath("/images/envite-shop-collection-v01.png")}
                      alt=""
                      width={1680}
                      height={945}
                      unoptimized
                    />
                  </div>
                  <div className="product-card-body">
                    <span className="product-status">{product.status}</span>
                    <p className="product-eyebrow">{product.eyebrow}</p>
                    <h2>{product.name}</h2>
                    <p>{product.summary}</p>
                    <Link className="text-link" href={`/tienda/${product.slug}`}>
                      Ver producto
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="commerce-steps-band" aria-labelledby="commerce-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Antes de vender</p>
              <h2 id="commerce-title">El comercio se abrirá cuando la operación esté cerrada.</h2>
            </div>
            <ol className="commerce-steps">
              <li>
                <span>01</span>
                <div>
                  <h3>Prototipo</h3>
                  <p>Diseño, reglas, materiales y uso real de cada producto.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Producción</h3>
                  <p>Proveedores, muestras, tirada mínima y control de calidad.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Operación</h3>
                  <p>Costes, embalaje, impuestos, envío, devoluciones y atención.</p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h3>Venta</h3>
                  <p>Precio, disponibilidad y pago solo cuando sean reales.</p>
                </div>
              </li>
            </ol>
            <p className="catalog-notice">
              Esta versión no permite comprar, reservar ni realizar pagos.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
