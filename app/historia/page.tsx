import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Historia del Envite Canario",
  description:
    "Historia documentada, variantes, vocabulario, fuentes y memoria oral del juego del Envite en Canarias.",
  alternates: {
    canonical: "/historia",
  },
};

export default function HistoryPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1}>
        <section className="history-hero">
          <div className="section-inner history-hero-inner">
            <p className="eyebrow">Historia y memoria oral</p>
            <h1>El Envite no tiene una sola mesa ni una historia cerrada.</h1>
            <p>
              Documentamos lo conocido, señalamos lo que sigue siendo una
              hipótesis y separamos las variantes territoriales para no convertir
              una costumbre local en regla universal.
            </p>
          </div>
        </section>

        <section className="history-intro-band">
          <div className="section-inner history-intro">
            <div>
              <p className="eyebrow">Qué podemos afirmar</p>
              <h2>Un juego de equipos, señas y envites.</h2>
            </div>
            <div>
              <p>
                La Academia Canaria de la Lengua describe el envite como un juego
                de baraja entre dos equipos en el que destacan la comunicación
                mediante señas y la puja lanzada al envidar.
              </p>
              <p>
                La misma fuente advierte que no se juega igual en todas las islas.
                Esa diversidad forma parte del objeto de estudio del proyecto.
              </p>
              <Link className="text-link" href="/fuentes">
                Consultar el índice de fuentes
              </Link>
            </div>
          </div>
        </section>

        <section className="evidence-band" aria-labelledby="evidence-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Evidencia e hipótesis</p>
              <h2 id="evidence-title">La procedencia exacta no está demostrada.</h2>
              <p>
                Las fuentes consultadas no permiten probar de forma concluyente
                cómo llegó el juego a Canarias. Algunas recogen hipótesis sobre
                su relación con otros juegos de envite, pero también señalan
                diferencias relevantes.
              </p>
            </div>
            <div className="evidence-grid">
              <article>
                <span>Documentado</span>
                <h3>Léxico del juego</h3>
                <p>
                  Existe investigación filológica basada en encuestas realizadas
                  en Gran Canaria y Tenerife.
                </p>
              </article>
              <article>
                <span>Por documentar</span>
                <h3>Transmisión territorial</h3>
                <p>
                  Faltan cronologías suficientes para explicar con precisión cómo
                  se extendieron reglas y variantes.
                </p>
              </article>
              <article>
                <span>Memoria viva</span>
                <h3>Jugadores y mesas</h3>
                <p>
                  Testimonios, fotografías, carteles y reglamentos locales serán
                  fuentes diferenciadas y fechadas.
                </p>
              </article>
            </div>
            <Link className="button button-dark" href="/fuentes">
              Revisar fuentes y alcance
            </Link>
          </div>
        </section>

        <section className="history-work-band" aria-labelledby="history-work-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Archivo en construcción</p>
              <h2 id="history-work-title">Cinco líneas para conservar el juego con rigor.</h2>
            </div>
            <ol className="history-lines">
              <li>
                <span>01</span>
                <div>
                  <h3>Reglas y variantes</h3>
                  <p>Base común, diferencias por territorio y fuente de cada versión.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Vocabulario</h3>
                  <p>Voces del juego, significado, localización y uso documentado.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Señas</h3>
                  <p>Señas confirmadas, contexto y variantes sin importar gestos de otros juegos.</p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h3>Torneos</h3>
                  <p>Convocatorias, resultados y fotografías con fecha y procedencia.</p>
                </div>
              </li>
              <li>
                <span>05</span>
                <div>
                  <h3>Testimonios</h3>
                  <p>Memoria oral identificada como tal, sin convertirla automáticamente en norma.</p>
                </div>
              </li>
            </ol>
            <nav className="related-knowledge" aria-label="Continuar aprendiendo sobre el Envite">
              <Link href="/como-jugar">Cómo jugar</Link>
              <Link href="/glosario">Consultar el glosario</Link>
              <Link href="/fuentes">Ver todas las fuentes</Link>
              <Link href="/torneos">Ver torneos</Link>
            </nav>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}