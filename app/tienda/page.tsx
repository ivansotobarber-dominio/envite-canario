import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "../content";
import { MilloCounterDemo } from "../millo-counter-demo";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { assetPath, siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Catálogo en preparación de barajas, packs de mesa, tapetes, marcadores de millos y material para torneos de Envite Canario.",
  alternates: {
    canonical: "/tienda",
  },
  openGraph: {
    title: "Tienda de Envite Canario",
    description:
      "Productos físicos para jugar, regalar y organizar mesas de Envite Canario con identidad canaria.",
    url: "/tienda",
    images: ["/images/envite-shop-collection-commercial-v05.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tienda de Envite Canario",
  url: `${siteUrl}/tienda/`,
  description:
    "Catálogo conceptual de productos físicos de Envite Canario en preparación.",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${siteUrl}/tienda/${product.slug}/`,
    })),
  },
};

const collectionRoles = [
  { code: "01", use: "Juego esencial" },
  { code: "02", use: "Mesa compartida" },
  { code: "03", use: "Ritual de partida" },
  { code: "04", use: "Torneo popular" },
  { code: "05", use: "Tanteo visible" },
];

const ritualTokens = [
  {
    title: "Tela canaria",
    text: "Franjas de romería aplicadas como tapete, borde y textura de mesa.",
  },
  {
    title: "Dorso propio",
    text: "Pintaderas, mar, barrancos, maretas y lectura rápida de cartas.",
  },
  {
    title: "Arrayar millos",
    text: "Tanteo visible para envites y manos, sin piezas sueltas ni dudas.",
  },
  {
    title: "Torneo popular",
    text: "Material para bares, fiestas, asociaciones y encuentros de pueblo.",
  },
];

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1}>
        <section className="portal-hero shop-hero shop-hero-canario">
          <div className="portal-hero-copy">
            <p className="eyebrow">Tienda en preparación</p>
            <h1>La tienda nace en la mesa.</h1>
            <p>
              Una mesa de Envite reconocible: dorsos con Pintadera de Guía,
              tapete funcional con tejido canario, marcador de millos y kit de
              torneo. Cultura material de guachinche y romería con acabado de
              producto serio.
            </p>
            <div className="shop-proof-line" aria-label="Principios de la tienda">
              <span>Sin stock inventado</span>
              <span>Sin precios falsos</span>
              <span>Diseño validado en mesa real</span>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#catalogo">
                Ver catálogo
              </a>
              <Link className="button button-quiet" href="/noticias/tienda-envite-canario-en-preparacion">
                Cómo saldrá la tienda
              </Link>
            </div>
          </div>
          <figure className="portal-hero-media shop-hero-media">
            <Image
              src={assetPath("/images/envite-shop-collection-commercial-v05.webp")}
              alt="Colección física conceptual de Envite Canario con cajas, mazos precintados, camiseta, tapete funcional y marcador de millos"
              width={1672}
              height={941}
              priority
              unoptimized
            />
            <figcaption>Representación conceptual. Los productos finales pueden cambiar.</figcaption>
          </figure>
        </section>

        <section className="shop-ritual-band" aria-label="Identidad de la tienda">
          <div className="section-inner shop-ritual-grid">
            {ritualTokens.map((token, index) => (
              <article className="ritual-token" key={token.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{token.title}</h2>
                <p>{token.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shop-featured-band" aria-labelledby="featured-shop-title">
          <div className="section-inner shop-featured-grid">
            <div className="shop-feature-copy">
              <p className="eyebrow">Producto tractor</p>
              <h2 id="featured-shop-title">Baraja, mantel y marcador: la mesa completa.</h2>
              <p>
                La colección tiene que vender una experiencia, no recuerdos sueltos.
                Cada pieza debe tener una función en la partida y una razón cultural
                clara: jugar, enseñar, contar puntos o montar torneo.
              </p>
              <div className="shop-textile-swatch" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <ul className="feature-list">
                <li>Tapete con lenguaje de tela canaria, sin perder legibilidad.</li>
                <li>Dorso de carta con identidad propia y lectura rápida.</li>
                <li>Marcador físico para arrayar envites y manos.</li>
                <li>Pack preparado para regalar, jugar y llevar a un torneo.</li>
              </ul>
            </div>
            <div className="shop-feature-demo">
              <MilloCounterDemo />
            </div>
          </div>
        </section>

        <section className="catalog-band shop-catalog-band" id="catalogo" aria-labelledby="catalog-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Primera colección</p>
              <h2 id="catalog-title">Pocos productos, con una función clara.</h2>
              <p>
                La baraja abre el catálogo. El Pack Mesa une lo físico y lo cultural.
                El Kit Torneo prepara el salto a asociaciones, fiestas y eventos.
              </p>
            </div>
            <div className="product-grid shop-product-grid">
              {products.map((product, index) => (
                <article className="product-card shop-product-card" key={product.slug}>
                  <div className={`product-crop product-crop-${index + 1}`}>
                    <span className="product-number" aria-hidden="true">
                      {collectionRoles[index]?.code}
                    </span>
                    <Image
                      src={assetPath(
                        product.slug === "marcador-de-millos"
                          ? "/images/envite-millos-counter-v01.png"
                          : product.slug === "pack-mesa-envite-canario"
                            ? "/images/envite-shop-collection-commercial-v05.webp"
                            : product.slug === "tapete-envite-canario"
                              ? "/images/envite-shop-table-pintadera-v04.webp"
                            : "/images/envite-shop-collection-canaria-v03.webp",
                      )}
                      alt=""
                      width={1680}
                      height={945}
                      unoptimized
                    />
                  </div>
                  <div className="product-card-body">
                    <div className="product-card-meta">
                      <span className="product-status">{product.status}</span>
                      <span>{collectionRoles[index]?.use}</span>
                    </div>
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

        <section className="commerce-steps-band shop-commerce-band" aria-labelledby="commerce-title">
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
