import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { assetPath } from "../../lib/site";

export const metadata: Metadata = {
  title: "Torneos populares",
  description:
    "Calendario verificable de torneos populares de Envite Canario por isla, municipio, fecha y modalidad.",
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
            <h1>Calendario de torneos populares</h1>
            <p>
              Una agenda pública para localizar partidas, seguir resultados y
              conservar la memoria de cada edición con datos trazables.
            </p>
          </div>
        </section>

        <section className="tournament-calendar-band">
          <div className="section-inner">
            <div className="calendar-toolbar" aria-label="Filtros previstos">
              <span>Próximos</span>
              <span>Todas las islas</span>
              <span>Todos los municipios</span>
              <span>Todas las modalidades</span>
            </div>
            <div className="event-list">
              <article className="event-card event-card-confirmed">
                <time dateTime="2026-08-01T20:00:00+01:00" className="event-date">
                  <strong>01</strong>
                  <span>AGO 2026</span>
                </time>
                <div className="event-copy">
                  <div className="event-flags">
                    <span>Confirmado</span>
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
                    <span>Programa pendiente</span>
                    <span>Tenerife</span>
                  </div>
                  <h2>Campeonato de Envite de las Fiestas de El Palmar</h2>
                  <p>
                    La agenda oficial confirma el campeonato dentro de las
                    fiestas de septiembre, pero todavía no publica día ni hora.
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
                La agenda servirá para decidir dónde jugar, no para acumular
                anuncios sin mantener.
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
                El archivo histórico se incorporará después del calendario vivo.
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