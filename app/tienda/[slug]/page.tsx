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

  const imageSrc =
    product.slug === "marcador-de-millos"
      ? "/images/envite-millos-counter-v01.png"
      : "/images/envite-shop-collection-canaria-v03.webp";

  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className="product-page">
        <section className="product-detail shop-product-detail">
          <figure className="product-detail-media">
            <Image
              src={assetPath(imageSrc)}
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
                <dd>13 de agosto de 2026.</dd>
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

        <section className="shop-culture-band" aria-labelledby="shop-culture-title">
          <div className="section-inner shop-culture-grid">
            <div>
              <p className="eyebrow">Criterio de diseño</p>
              <h2 id="shop-culture-title">Canario porque se usa, no porque se decora.</h2>
            </div>
            <ul>
              <li>Tela canaria como lenguaje gráfico de mesa, no como estampado gratuito.</li>
              <li>Dorsos propios con pintadera, mar, barranco, mareta y lectura limpia.</li>
              <li>Material pensado para guachinches, casas, asociaciones, colegios y torneos populares.</li>
            </ul>
          </div>
        </section>

        {product.slug === "marcador-de-millos" ? (
          <section className="millos-use-band" aria-labelledby="millos-use-title">
            <div className="section-inner millos-use-grid">
              <div>
                <p className="eyebrow">Uso previsto</p>
                <h2 id="millos-use-title">Que el tanteo se vea, se mueva y no se pierda.</h2>
              </div>
              <ol>
                <li>
                  <span>01</span>
                  <p>Al cerrar un envite, se desplaza la corredera del equipo correspondiente.</p>
                </li>
                <li>
                  <span>02</span>
                  <p>Al terminar una mano, se registra en el carril independiente de manos cerradas.</p>
                </li>
                <li>
                  <span>03</span>
                  <p>La mesa conserva el estado sin millos sueltos, papel ni cuentas de memoria.</p>
                </li>
              </ol>
            </div>
          </section>
        ) : null}

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
