import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { assetPath } from "../../lib/site";

export const metadata: Metadata = {
  title: "Archivo de convocatorias de torneos populares",
  description:
    "Convocatorias archivadas de Envite Canario con fecha, lugar y fuente. No se acreditan inscripciones abiertas ni resultados de los torneos.",
  alternates: {
    canonical: "/torneos",
  },
};

const verificationFields = [
  "Organizador identificado",
  "Isla y municipio",
  "Lugar y horario",
  "Modalidad y participantes",
  "Estado de inscripción",
  "Fuente y última verificación",
];

export default function TournamentsPage() {

  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1}>
        <section className="tournament-hero">
          <Image
            className="tournament-hero-image"
            src={assetPath("/images/envite-tournament-harbour-v01.webp")}
            alt="Representación editorial de un torneo popular de cartas junto a un puerto canario"
            width={1680}
            height={945}
            priority
            unoptimized
          />
          <div className="tournament-hero-shade" aria-hidden="true" />
          <div className="section-inner tournament-hero-copy">
            <p className="eyebrow">Mesas reales</p>
            <h1>Archivo de convocatorias de torneos</h1>
            <p>
              Conservamos los anuncios consultados con sus fechas y fuentes.
              Una convocatoria archivada no acredita celebración ni resultados.
            </p>
          </div>
        </section>

        <section className="tournament-calendar-band">
          <div className="section-inner">
            <p className="beta-warning">
              Archivo de convocatorias de 2026. Las fechas siguientes ya han pasado;
              no se acreditan inscripciones abiertas ni resultados. No hay nuevas
              convocatorias verificadas incorporadas a esta página.
            </p>
            <div className="event-list">
              <article className="event-card event-card-confirmed">
                <time dateTime="2026-08-01T20:00:00+01:00" className="event-date">
                  <strong>01</strong>
                  <span>AGO 2026</span>
                </time>
                <div className="event-copy">
                  <div className="event-flags">
                    <span>Fecha pasada</span>
                    <span>Lanzarote</span>
                    <span>2 contra 2</span>
                  </div>
                  <h2>Envite de las Fiestas de San Roque</h2>
                  <dl>
                    <div>
                      <dt>Hora</dt>
                      <dd>20:00</dd>
                    </div>
                    <div>
                      <dt>Lugar</dt>
                      <dd>Ventorrillos de las Fiestas de San Roque, Tinajo</dd>
                    </div>
                    <div>
                      <dt>Organiza</dt>
                      <dd>Club de Lucha Tinajo con la Concejalía de Festejos</dd>
                    </div>
                  </dl>
                  <Link
                    className="text-link"
                    href="/torneos/envite-2-contra-2-tinajo-2026"
                  >
                    Ver ficha completa del torneo
                  </Link>
                  <a
                    className="text-link"
                    href="https://www.tinajo.es/noticias/campeonatos-tradicionales-san-roque-0"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Consultar fuente oficial
                  </a>
                  <small>Verificado el 30 de julio de 2026.</small>
                </div>
              </article>

              <article className="event-card event-card-pending">
                <time dateTime="2026-09" className="event-date">
                  <strong>SEP</strong>
                  <span>2026</span>
                </time>
                <div className="event-copy">
                  <div className="event-flags">
                    <span>Archivo, programa no contrastado</span>
                    <span>Tenerife</span>
                  </div>
                  <h2>Campeonato de Envite de las Fiestas de El Palmar</h2>
                  <p>
                    La referencia consultada en julio situaba el campeonato en
                    las fiestas de septiembre. No se ha contrastado aquí el
                    programa definitivo ni el resultado.
                  </p>
                  <a
                    className="text-link"
                    href="https://www.holaislascanarias.com/eventos/tenerife/fiestas-de-el-palmar/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Consultar agenda oficial
                  </a>
                  <small>Última comprobación: 30 de julio de 2026.</small>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="verification-band" aria-labelledby="verification-title">
          <div className="section-inner verification-layout">
            <div className="section-heading">
              <p className="eyebrow">Ficha mínima</p>
              <h2 id="verification-title">Cada torneo deberá poder comprobarse.</h2>
              <p>
                Cada convocatoria conserva su fuente y fecha de comprobación.
                Las futuras incorporaciones deberán distinguir anuncio, inscripción y resultado.
              </p>
            </div>
            <ul className="verification-list">
              {verificationFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="archive-band" aria-labelledby="archive-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Archivo</p>
              <h2 id="archive-title">Resultados y memoria de las ediciones cerradas.</h2>
              <p>
                Este archivo conserva las convocatorias consultadas, no un calendario de inscripción vigente.
                Separará convocatoria, resultados, fotografías y fuente original.
              </p>
            </div>
            <Link className="text-link" href="/clasificacion">
              Ver metodología de clasificación
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
