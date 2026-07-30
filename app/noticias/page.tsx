import type { Metadata } from "next";
import Link from "next/link";
import { newsPosts } from "../content";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Actualidad verificada sobre la app, la tienda, los torneos y el trabajo cultural de Envite Canario.",
  alternates: {
    canonical: "/noticias",
  },
};

export default function NewsPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1}>
        <section className="portal-title-band news-title-band">
          <div className="section-inner portal-title">
            <p className="eyebrow">Actualidad del proyecto</p>
            <h1>Noticias de Envite Canario</h1>
            <p>
              Desarrollo de la aplicación, productos, torneos y documentación
              cultural con fecha, autoría y estado identificables.
            </p>
          </div>
        </section>

        <section className="news-index-band">
          <div className="section-inner news-grid">
            {newsPosts.map((post, index) => (
              <article className={index === 0 ? "news-card news-card-featured" : "news-card"} key={post.slug}>
                <div className="news-meta">
                  <span>{post.category}</span>
                  <time dateTime={post.isoDate}>{post.published}</time>
                </div>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
                <Link className="text-link" href={`/noticias/${post.slug}`}>
                  Leer noticia
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
