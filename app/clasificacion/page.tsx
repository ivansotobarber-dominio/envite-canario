import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Clasificación",
  description:
    "Metodología y futura clasificación trazable de jugadores, equipos y torneos de Envite Canario.",
  alternates: {
    canonical: "/clasificacion",
  },
};

const requirements = [
  {
    title: "Temporada",
    copy: "Periodo de cómputo, fecha de cierre y reinicio definidos antes de sumar puntos.",
  },
  {
    title: "Torneos computables",
    copy: "Solo eventos con bases, resultados y organizador verificables.",
  },
  {
    title: "Puntuación",
    copy: "Regla pública para victorias, rondas, posición, empates y abandonos.",
  },
  {
    title: "Identidad",
    copy: "Participantes y equipos conciliados sin duplicados ni alias ambiguos.",
  },
  {
    title: "Correcciones",
    copy: "Procedimiento documentado para reclamar y rectificar resultados.",
  },
  {
    title: "Trazabilidad",
    copy: "Cada punto debe llevar de vuelta al resultado que lo originó.",
  },
];

export default function RankingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="portal-title-band ranking-title-band">
          <div className="section-inner portal-title">
            <p className="eyebrow">Competición con reglas públicas</p>
            <h1>Clasificación de Envite Canario</h1>
            <p>
              La clasificación se publicará cuando exista una metodología común
              y resultados suficientemente trazables. No habrá nombres ni puntos
              de demostración presentados como reales.
            </p>
          </div>
        </section>

        <section className="ranking-board-band">
          <div className="section-inner">
            <div className="ranking-tabs" aria-label="Vistas previstas">
              <span className="active">General</span>
              <span>Temporada</span>
              <span>Por isla</span>
              <span>Por torneo</span>
              <span>Equipos</span>
            </div>
            <div className="ranking-placeholder">
              <div className="ranking-placeholder-head">
                <span>Posición</span>
                <span>Jugador o equipo</span>
                <span>Torneos</span>
                <span>Puntos</span>
              </div>
              <div className="ranking-empty">
                <strong>Clasificación en preparación</strong>
                <span>Sin resultados publicados hasta aprobar el reglamento.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="method-band" aria-labelledby="method-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Reglamento antes que ranking</p>
              <h2 id="method-title">Seis condiciones para que la tabla sea defendible.</h2>
            </div>
            <div className="method-grid">
              {requirements.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
