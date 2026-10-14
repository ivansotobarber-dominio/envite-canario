import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../site-chrome";
import { assetPath, siteUrl } from "../../../lib/site";

const eventPath = "/torneos/envite-2-contra-2-tinajo-2026";
const sourceUrl =
  "https://www.tinajo.es/noticias/campeonatos-tradicionales-san-roque-0";

export const metadata: Metadata = {
  title: "Envite 2 contra 2 en Tinajo, 1 de agosto de 2026",
  description:
    "Convocatoria archivada del Envite 2 contra 2 de San Roque 2026 en Tinajo: fecha, lugar y fuente municipal, sin resultados ni inscripción vigente acreditados.",
  alternates: {
    canonical: eventPath,
  },
  openGraph: {
    type: "article",
    title: "Envite 2 contra 2 en Tinajo, 1 de agosto de 2026",
    description:
      "Convocatoria archivada de San Roque en Tinajo, sin confirmar celebración ni resultados.",
    url: eventPath,
    images: [assetPath("/images/envite-tournament-harbour-v01.webp")],
  },
};

export default function TinajoTournamentPage() {
  const eventUrl = `${siteUrl}${eventPath}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "@id": `${eventUrl}#evento`,
        name: "Envite 2 contra 2 de las Fiestas de San Roque 2026",
        description:
          "Campeonato popular de Envite 2 contra 2 incluido en la programación de las Fiestas de San Roque de Tinajo.",
        startDate: "2026-08-01T20:00:00+01:00",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        image: `${siteUrl}${assetPath("/images/envite-tournament-harbour-v01.webp")}`,
        location: {
          "@type": "Place",
          name: "Ventorrillos de las Fiestas de San Roque",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tinajo",
            addressRegion: "Lanzarote",
            addressCountry: "ES",
          },
        },
        organizer: {
          "@type": "Organization",
          name: "Club de Lucha Tinajo y Concejalía de Festejos del Ayuntamiento de Tinajo",
        },
        url: eventUrl,
        sameAs: sourceUrl,
        mainEntityOfPage: eventUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Envite Canario",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Torneos",
            item: `${siteUrl}/torneos/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Tinajo 2026",
            item: eventUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className="article-page">
        <article className="article-inner">
          <nav className="news-meta" aria-label="Ruta del torneo">
            <Link href="/torneos">Torneos</Link>
            <span>Lanzarote</span>
            <span>Archivo de convocatoria</span>
          </nav>
          <h1>Envite 2 contra 2 en Tinajo</h1>
          <p className="article-lead">
            Campeonato popular incluido en las Fiestas de San Roque de Tinajo,
            con fecha, hora, lugar y organización publicados por el Ayuntamiento.
          </p>
          <div className="article-body">
            <p className="beta-warning">
              Fecha pasada. Se conserva la convocatoria documentada, sin afirmar
              que se celebrara ni acreditar resultados o inscripciones abiertas.
            </p>
            <h2>Datos verificados</h2>
            <p>
              <strong>Fecha:</strong> sábado 1 de agosto de 2026, a las 20:00.
            </p>
            <p>
              <strong>Lugar:</strong> ventorrillos de las Fiestas de San Roque,
              Tinajo, Lanzarote.
            </p>
            <p>
              <strong>Modalidad:</strong> Envite por parejas, 2 contra 2.
            </p>
            <p>
              <strong>Organización:</strong> Club de Lucha Tinajo con la
              Concejalía de Festejos del Ayuntamiento de Tinajo.
            </p>
            <h2>Datos no recogidos en la convocatoria consultada</h2>
            <p>
              La fuente consultada no detalla en esta ficha precio, sistema de
              inscripción, bases completas ni premios. Envite Canario no los
              completa mediante estimaciones. Se conserva el alcance de la
              consulta de julio, sin ofrecer inscripciones actuales.
            </p>
          </div>
          <aside className="article-source-note">
            <strong>Fuente primaria</strong>
            <span>Ayuntamiento de Tinajo. Comprobada el 30 de julio de 2026.</span>
            <a className="text-link" href={sourceUrl} target="_blank" rel="noreferrer">
              Consultar publicación municipal
            </a>
          </aside>
          <Link className="text-link" href="/torneos">
            Volver al archivo de convocatorias
          </Link>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
