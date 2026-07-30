import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "../../content";
import { SiteFooter, SiteHeader } from "../../site-chrome";
import { assetPath } from "../../../lib/site";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.summary,
    alternates: {
      canonical: `/tienda/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="product-page">
        <section className="product-detail">
          <figure className="product-detail-media">
            <Image
              src={assetPath("/images/envite-shop-collection-v01.png")}
              alt={`Representación conceptual de ${product.name}`}
              width={1680}
              height={945}
              priority
              unoptimized
            />
            <figcaption>Representación conceptual. Diseño final pendiente de validación.</figcaption>
          </figure>
          <div className="product-detail-copy">
            <p className="eyebrow">{product.eyebrow}</p>
            <h1>{product.name}</h1>
            <span className="product-status">{product.status}</span>
            <p className="product-lead">{product.summary}</p>
            <dl className="product-facts">
              <div>
                <dt>Para quién</dt>
                <dd>{product.audience}</dd>
              </div>
              <div>
                <dt>Disponibilidad</dt>
                <dd>No disponible para compra o reserva.</dd>
              </div>
              <div>
                <dt>Última actualización</dt>
                <dd>30 de julio de 2026.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="product-spec-band">
          <div className="section-inner product-spec-grid">
            <div>
              <p className="eyebrow">Contenido previsto</p>
              <h2>Qué queremos resolver.</h2>
              <ul className="spec-list">
                {product.plannedContents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Antes de vender</p>
              <h2>Qué falta por cerrar.</h2>
              <ul className="spec-list pending-list">
                {product.pending.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="product-return-band">
          <div className="section-inner product-return">
            <div>
              <p className="eyebrow">Tienda Envite Canario</p>
              <h2>El catálogo crecerá después de validar la baraja.</h2>
            </div>
            <Link className="button button-dark" href="/tienda">
              Volver al catálogo
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
