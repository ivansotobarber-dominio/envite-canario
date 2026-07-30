import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

const siteUrl = "https://envitecanario.es";

const sources = [
  {
    name: "Universidad de La Laguna, El léxico del juego del envite",
    url: "https://riull.ull.es/xmlui/handle/915/21732",
  },
  {
    name: "N. H. Fournier, guía del Envite Canario",
    url: "https://www.nhfournier.es/como-jugar/envite-canario/",
  },
  {
    name: "BienMeSabe, artículo de Elfidio Alonso",
    url: "https://www.bienmesabe.org/noticia/2012/Junio/el-envite",
  },
  {
    name: "Web de Lanzarote, descripción local del juego",
    url: "http://www.webdelanzarote.com/envite.htm",
  },
  {
    name: "IES Nicolás Estévez Borges, taller de patrimonio canario",
    url: "https://www3.gobiernodecanarias.org/medusa/edublog/iesnicolasestevezborges/?p=5044",
  },
  {
    name: "Academia Canaria de la Lengua, consulta sobre el Envite",
    url: "https://www.academiacanarialengua.org/consultas/2010/04/envite/",
  },
] as const;

const provisionalFlow = [
  {
    title: "Forma dos equipos",
    copy:
      "Para esta guía se parte de cuatro personas, dos por equipo, sentadas de forma alterna. Es una base didáctica provisional, no una declaración de modalidad universal.",
  },
  {
    title: "Baraja, corta y muestra la vira",
    copy:
      "Se utiliza baraja española. Tras barajar y cortar, una carta visible determina el palo de lo virado en las variantes descritas por las fuentes operativas consultadas.",
  },
  {
    title: "Reparte tres cartas",
    copy:
      "Las descripciones detalladas consultadas coinciden en repartir tres cartas a cada participante. El sentido y la persona que abre deben fijarse según la variante acordada.",
  },
  {
    title: "Lee tu mano y coordina el equipo",
    copy:
      "Las señas permiten comunicar información al equipo. La persona que manda coordina la respuesta, pero el repertorio de gestos y cartas asociadas cambia con la modalidad.",
  },
  {
    title: "Juega cada baza",
    copy:
      "Cada persona aporta una carta por turno. La carta que gana depende de la vira, de la jerarquía aplicable y, cuando exista arrastre, de la obligación de servir.",
  },
  {
    title: "Responde al envite",
    copy:
      "Un equipo puede elevar lo que se disputa. El contrario puede aceptar, rechazar o subir según la secuencia de su variante. Los valores exactos no se presentan aquí como universales.",
  },
  {
    title: "Cierra la ronda",
    copy:
      "En las reglas operativas consultadas, el equipo que gana dos de las tres bazas se lleva la ronda. El tanteo posterior, los chicos y el tumbo requieren validar la mesa concreta.",
  },
] as const;

const faqs = [
  {
    question: "¿Qué necesito para empezar a jugar?",
    answer:
      "Cuatro personas para esta versión didáctica 2 contra 2, una baraja española, marcadores para el tanteo y una variante acordada antes de repartir.",
  },
  {
    question: "¿El 2 contra 2 es la única forma de jugar?",
    answer:
      "No. Las fuentes describen equipos de distintos tamaños. Esta página usa el 2 contra 2 solo como flujo inicial y mantiene pendientes de validación la jerarquía y el tanteo de cada modalidad.",
  },
  {
    question: "¿Qué es la vira?",
    answer:
      "Es la carta que queda visible tras el corte o el reparto en las versiones consultadas. Su palo determina las cartas de lo virado, cuya fuerza depende de la modalidad.",
  },
  {
    question: "¿Cómo sé qué carta gana una baza?",
    answer:
      "Hay que aplicar la jerarquía de la modalidad, el palo de la vira, el palo de salida y las reglas de arrastre. No conviene memorizar una tabla sin identificar antes dónde y con cuántas personas se juega.",
  },
  {
    question: "¿Las señas son iguales en todas las islas?",
    answer:
      "No debe asumirse. Las fuentes recogen coincidencias, pero también cambios por territorio y número de participantes. Cada seña debe publicarse con su contexto y procedencia.",
  },
  {
    question: "¿La WebApp puede arbitrar una partida real?",
    answer:
      "Todavía no. La WebApp es una beta de un proyecto independiente. Sirve para probar el flujo, pero las reglas del motor siguen sujetas a contraste con fuentes y jugadores conocedores de cada variante.",
  },
] as const;

export const metadata: Metadata = {
  title: "Cómo jugar al Envite Canario: guía para empezar",
  description:
    "Aprende el flujo básico del Envite Canario con una guía 2 contra 2 provisional, señas, vira, bazas y envite, siempre diferenciando variantes.",
  keywords: [
    "cómo jugar al envite canario",
    "reglas envite canario",
    "juego de cartas canario",
    "señas del envite",
    "vira envite canario",
  ],
  alternates: {
    canonical: "/como-jugar",
  },
  openGraph: {
    title: "Cómo jugar al Envite Canario",
    description:
      "Guía para principiantes con flujo 2 contra 2 provisional, fuentes y variantes identificadas.",
    type: "article",
    locale: "es_ES",
    url: `${siteUrl}/como-jugar/`,
    siteName: "Envite Canario",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Cómo jugar",
          item: `${siteUrl}/como-jugar/`,
        },
      ],
    },
    {
      "@type": "Article",
      headline: "Cómo jugar al Envite Canario: guía para empezar",
      description:
        "Guía independiente para aprender un flujo 2 contra 2 provisional sin presentar una variante local como canon universal.",
      inLanguage: "es",
      mainEntityOfPage: `${siteUrl}/como-jugar/`,
      isAccessibleForFree: true,
      citation: sources.map((source) => source.url),
      about: [
        "Envite Canario",
        "Juegos tradicionales de Canarias",
        "Baraja española",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function HowToPlayPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="rules-hero">
          <div className="section-inner rules-hero-inner">
            <p className="eyebrow">Guía para empezar</p>
            <h1>Cómo jugar al Envite Canario</h1>
            <p>
              Una explicación práctica para entrar en la mesa sin confundir una
              variante con todas las demás. El flujo 2 contra 2 es provisional y
              forma parte de un proyecto independiente en construcción.
            </p>
            <a className="button button-primary" href="#flujo-2x2">
              Ver el flujo 2 contra 2
            </a>
          </div>
        </section>

        <section className="history-intro-band">
          <div className="section-inner history-intro">
            <div>
              <p className="eyebrow">Antes de repartir</p>
              <h2>Acuerden primero qué variante van a jugar.</h2>
            </div>
            <div>
              <p>
                Las fuentes coinciden en una estructura de equipos, baraja
                española, señas, envite y tanteo. También documentan diferencias
                en el vocabulario, la puntuación, las cartas de mayor valor y las
                consecuencias del tumbo.
              </p>
              <p>
                El estudio de la Universidad de La Laguna identifica un núcleo
                esencial compartido, pero también variaciones entre islas,
                localidades y mesas. Sus autores advierten que las respuestas de
                sus informantes no tienen por qué ser únicas ni generales.
              </p>
              <p>
                Por eso esta guía separa la mecánica común de los detalles que
                todavía requieren validación territorial y práctica. Para una
                partida o torneo real, prevalece el reglamento acordado por su
                organización.
              </p>
              <Link className="text-link" href="/normas-y-variantes">
                Consultar normas y variantes
              </Link>
            </div>
          </div>
        </section>

        <section className="evidence-band" aria-labelledby="common-ground-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Base compartida</p>
              <h2 id="common-ground-title">Qué se puede explicar con prudencia.</h2>
              <p>
                Estos elementos aparecen de forma consistente en las referencias
                principales, aunque su aplicación concreta deba vincularse a una
                modalidad.
              </p>
            </div>
            <div className="evidence-grid">
              <article>
                <span>Estructura</span>
                <h3>Dos equipos</h3>
                <p>
                  Los bandos se sientan de forma alterna y coordinan sus
                  decisiones durante la ronda.
                </p>
              </article>
              <article>
                <span>Comunicación</span>
                <h3>Señas y mando</h3>
                <p>
                  El equipo comparte información mediante gestos y una persona
                  puede dirigir la estrategia de juego.
                </p>
              </article>
              <article>
                <span>Variabilidad</span>
                <h3>La modalidad importa</h3>
                <p>
                  La fuerza de las cartas, las señas y el tanteo pueden cambiar
                  por territorio y número de participantes.
                </p>
              </article>
            </div>
            <Link className="button button-dark" href="/fuentes">
              Ver metodología y fuentes
            </Link>
          </div>
        </section>

        <section
          className="history-work-band"
          id="flujo-2x2"
          aria-labelledby="flow-title"
        >
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Flujo didáctico provisional</p>
              <h2 id="flow-title">Una primera ronda en siete pasos.</h2>
              <p>
                Este recorrido permite aprender la secuencia de la mesa. No fija
                todavía una tabla definitiva de cartas, señas o puntuación.
              </p>
            </div>
            <ol className="history-lines">
              {provisionalFlow.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link className="text-link" href="/glosario">
              Abrir el glosario del Envite
            </Link>
          </div>
        </section>

        <section
          className="variant-policy-band"
          aria-labelledby="validation-title"
        >
          <div className="section-inner variant-policy-layout">
            <div>
              <p className="eyebrow">Pendiente de validación</p>
              <h2 id="validation-title">Lo que no conviene universalizar.</h2>
            </div>
            <ul className="variant-policy">
              <li>
                <strong>Jerarquía de cartas</strong>
                <span>
                  Cambia con el número de participantes y la variante
                  territorial.
                </span>
              </li>
              <li>
                <strong>Repertorio de señas</strong>
                <span>
                  Debe vincular cada gesto a una carta, modalidad y procedencia.
                </span>
              </li>
              <li>
                <strong>Tanteo</strong>
                <span>
                  Los valores del envite, del chico y del tumbo no son uniformes.
                </span>
              </li>
              <li>
                <strong>Terminología</strong>
                <span>
                  Envido, envío, mano, baza y otros términos pueden variar según
                  el lugar y la fuente.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="rules-core-band" aria-labelledby="faq-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Preguntas frecuentes</p>
              <h2 id="faq-title">Dudas antes de la primera partida.</h2>
            </div>
            <div className="rules-core-grid">
              {faqs.map((faq) => (
                <article key={faq.question}>
                  <span className="card-suit">RESPUESTA BREVE</span>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="history-work-band" aria-labelledby="guide-sources-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Referencias consultadas</p>
              <h2 id="guide-sources-title">Seis referencias, ninguna regla única.</h2>
              <p>
                Las referencias se usan por su aportación concreta. Ninguna se
                presenta por sí sola como canon universal del Envite Canario.
              </p>
            </div>
            <ol className="history-lines">
              {sources.map((source, index) => (
                <li key={source.url}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{source.name}</h3>
                    <a
                      className="text-link"
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir la fuente
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="rules-cta-band">
          <div className="section-inner rules-cta">
            <div>
              <p className="eyebrow">Aprender jugando</p>
              <h2>Prueba el flujo actual de la mesa.</h2>
            </div>
            <Link className="button button-dark" href="/app">
              Entrar en la WebApp
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
