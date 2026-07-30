import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Normas y variantes",
  description:
    "Base común, conceptos, fuentes y variantes de 2 contra 2 a 6 contra 6 del Envite Canario, con límites explícitos.",
  alternates: {
    canonical: "/normas-y-variantes",
  },
};

const modes = [
  {
    mode: "2 contra 2",
    state: "Modalidad base",
    copy: "La entrada más directa para aprender el flujo y validar el motor del juego.",
  },
  {
    mode: "3 contra 3",
    state: "Prevista",
    copy: "Amplía la lectura de equipo y puede alterar cartas relevantes y señas.",
  },
  {
    mode: "4 contra 4",
    state: "Documentada en torneo",
    copy: "Modalidad usada en competiciones populares y prevista en el motor.",
  },
  {
    mode: "5 contra 5",
    state: "Prevista",
    copy: "Requiere validar disposición de mesa, jerarquía y ritmo de turnos.",
  },
  {
    mode: "6 contra 6",
    state: "Prevista",
    copy: "La mesa más amplia exige reglas y ayudas específicas para conservar claridad.",
  },
];

export default function RulesAndVariantsPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1}>
        <section className="rules-hero">
          <div className="section-inner rules-hero-inner">
            <p className="eyebrow">Cómo se juega</p>
            <h1>Normas y variantes del Envite Canario</h1>
            <p>
              Una base común para entender la mesa, con diferencias señaladas
              por modalidad, isla, municipio y costumbre. No existe un reglamento
              único que permita presentar una versión local como universal.
            </p>
            <a className="button button-primary" href="#base-comun">
              Ver base común
            </a>
          </div>
        </section>

        <section className="rules-core-band" id="base-comun" aria-labelledby="rules-core-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Base documentada</p>
              <h2 id="rules-core-title">Lo que comparte la mesa.</h2>
              <p>
                La documentación inventariada permite identificar un núcleo
                común, pero los detalles de tanteo, cartas, señas y terminología
                deben vincularse siempre a su variante y a su fuente.
              </p>
            </div>
            <div className="rules-core-grid">
              <article>
                <span className="card-suit">OROS</span>
                <h3>Dos equipos</h3>
                <p>Los jugadores se distribuyen por bandos y coordinan decisiones.</p>
              </article>
              <article>
                <span className="card-suit">COPAS</span>
                <h3>Baraja española</h3>
                <p>La modalidad condiciona qué cartas tienen valor especial.</p>
              </article>
              <article>
                <span className="card-suit">ESPADAS</span>
                <h3>Señas</h3>
                <p>La pareja o el equipo comunica información mediante gestos acordados.</p>
              </article>
              <article>
                <span className="card-suit">BASTOS</span>
                <h3>Envite</h3>
                <p>Un equipo puede retar al contrario y este debe responder.</p>
              </article>
            </div>
            <Link className="text-link" href="/fuentes">
              Consultar las fuentes y sus límites
            </Link>
          </div>
        </section>

        <section className="modes-band" aria-labelledby="modes-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Capacidad de la mesa</p>
              <h2 id="modes-title">De 2 contra 2 a 6 contra 6.</h2>
              <p>
                El producto se diseñará para estas cinco capacidades. Activar
                una modalidad exige validar reglas, jerarquía de cartas, señas y
                legibilidad de la interfaz.
              </p>
            </div>
            <div className="modes-table">
              {modes.map((item) => (
                <article key={item.mode}>
                  <h3>{item.mode}</h3>
                  <span>{item.state}</span>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="variant-policy-band" aria-labelledby="variant-policy-title">
          <div className="section-inner variant-policy-layout">
            <div>
              <p className="eyebrow">Política editorial</p>
              <h2 id="variant-policy-title">Cada regla necesita contexto.</h2>
            </div>
            <ol className="variant-policy">
              <li>
                <strong>Base común</strong>
                <span>Coincidencias respaldadas por varias fuentes.</span>
              </li>
              <li>
                <strong>Variante identificada</strong>
                <span>Regla vinculada a un territorio, modalidad o reglamento.</span>
              </li>
              <li>
                <strong>Memoria oral</strong>
                <span>Testimonio conservado sin elevarlo automáticamente a norma.</span>
              </li>
              <li>
                <strong>Pendiente de contraste</strong>
                <span>Contenido que no se usa todavía como referencia del motor.</span>
              </li>
            </ol>
          </div>
        </section>

        <section className="rules-cta-band">
          <div className="section-inner rules-cta">
            <div>
              <p className="eyebrow">De la norma a la mesa</p>
              <h2>Aprende el flujo y prueba la WebApp.</h2>
              <nav className="related-knowledge" aria-label="Guías y referencias del Envite">
                <Link href="/como-jugar">Cómo jugar</Link>
                <Link href="/glosario">Glosario</Link>
                <Link href="/fuentes">Fuentes</Link>
              </nav>
            </div>
            <Link className="button button-dark" href="/app">
              Ir a jugar
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}