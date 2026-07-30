import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

const siteUrl = "https://envitecanario.es";

const sourceRecords = [
  {
    name:
      "Universidad de La Laguna, El léxico del juego del envite, Ortega Ojeda y González Aguiar, 2002",
    url: "https://riull.ull.es/xmlui/handle/915/21732",
    level: "Nivel 1, fuente académica principal",
    contribution:
      "Presenta los resultados de una encuesta de 153 preguntas sobre el léxico del Envite, con cinco informantes en Gran Canaria y cinco en Tenerife. Documenta terminología común, variaciones insulares y particularidades locales.",
    limitation:
      "El propio artículo advierte que las respuestas no tienen por qué ser únicas ni generales en cada isla. Su campo principal es lingüístico y no cubre las islas menores.",
  },
  {
    name: "Academia Canaria de la Lengua",
    url: "https://www.academiacanarialengua.org/consultas/2010/04/envite/",
    level: "Nivel 1, referencia institucional lingüística",
    contribution:
      "Aporta prudencia sobre el origen del juego y remite a investigación filológica basada en encuestas de Gran Canaria y Tenerife.",
    limitation:
      "No es un reglamento completo. Su valor principal está en el marco histórico, lingüístico y metodológico.",
  },
  {
    name: "N. H. Fournier, guía del Envite Canario",
    url: "https://www.nhfournier.es/como-jugar/envite-canario/",
    level: "Nivel 2, referencia sectorial detallada",
    contribution:
      "Describe preparación, reparto, envite, jerarquías por número de participantes, arrastre, renuncio, tumbo y diferencias territoriales.",
    limitation:
      "Es una guía de fabricante, no una norma institucional ni un canon universal. Sus tablas deben contrastarse por modalidad.",
  },
  {
    name: "BienMeSabe, El Envite, de Elfidio Alonso",
    url: "https://www.bienmesabe.org/noticia/2012/Junio/el-envite",
    level: "Nivel 2, referencia cultural y léxica",
    contribution:
      "Reúne contexto cultural, señas, modalidades, tanteo y un glosario amplio. El texto publicado en 2012 procede de una publicación de 1983.",
    limitation:
      "Las hipótesis históricas deben conservarse como hipótesis. Los usos léxicos y reglas necesitan localización y contraste.",
  },
  {
    name: "Web de Lanzarote, El juego del Envite",
    url: "http://www.webdelanzarote.com/envite.htm",
    level: "Nivel 3, fuente local de autoridad limitada",
    contribution:
      "Documenta triunfos, señas, funciones del equipo, tanteo, envite, arrastre y tumbo desde una descripción vinculada a Lanzarote.",
    limitation:
      "Es una página antigua, sin conexión segura HTTPS y de autoría local. Resulta útil para estudiar una variante, pero requiere contraste antes de trasladarla al motor.",
  },
  {
    name: "IES Nicolás Estévez Borges, taller de iniciación",
    url: "https://www3.gobiernodecanarias.org/medusa/edublog/iesnicolasestevezborges/?p=5044",
    level: "Nivel 3, evidencia de transmisión educativa",
    contribution:
      "Acredita el uso del Envite como actividad de transmisión del patrimonio canario con alumnado de tercero de la ESO durante el curso 2023-2024.",
    limitation:
      "La entrada prueba una práctica educativa, no define reglas, señas ni puntuación.",
  },
] as const;

const evidenceLevels = [
  {
    title: "Nivel 1",
    copy:
      "Trabajos académicos e instituciones lingüísticas con método, autoría, muestra y alcance identificables.",
  },
  {
    title: "Nivel 2",
    copy:
      "Guías sectoriales y publicaciones culturales detalladas. Sirven para construir hipótesis y comparar reglas.",
  },
  {
    title: "Nivel 3",
    copy:
      "Fuentes locales, educativas y testimoniales. Conservan variantes y memoria, pero necesitan contraste adicional.",
  },
  {
    title: "Pendiente de contraste",
    copy:
      "Afirmaciones sin territorio, modalidad, autoría o respaldo suficiente. No pasan al motor como regla activa.",
  },
] as const;

export const metadata: Metadata = {
  title: "Fuentes del Envite Canario y metodología editorial",
  description:
    "Bibliografía anotada, niveles de evidencia y método para documentar reglas, términos, señas e historia del Envite Canario sin crear un canon falso.",
  keywords: [
    "fuentes envite canario",
    "historia envite canario",
    "reglas envite fuentes",
    "léxico del envite",
    "variantes envite canario",
  ],
  alternates: {
    canonical: "/fuentes",
  },
  openGraph: {
    title: "Fuentes y metodología del proyecto Envite Canario",
    description:
      "Bibliografía anotada y criterio para distinguir base común, variante, memoria e hipótesis.",
    type: "article",
    locale: "es_ES",
    url: `${siteUrl}/fuentes/`,
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
          name: "Fuentes",
          item: `${siteUrl}/fuentes/`,
        },
      ],
    },
    {
      "@type": "Article",
      headline: "Fuentes del Envite Canario y metodología editorial",
      description:
        "Bibliografía anotada y método de un proyecto independiente para documentar el Envite Canario con trazabilidad.",
      inLanguage: "es",
      mainEntityOfPage: `${siteUrl}/fuentes/`,
      isAccessibleForFree: true,
      citation: sourceRecords.map((source) => source.url),
      about: [
        "Envite Canario",
        "Patrimonio cultural de Canarias",
        "Juegos de cartas",
      ],
    },
    {
      "@type": "ItemList",
      name: "Referencias consultadas sobre el Envite Canario",
      numberOfItems: sourceRecords.length,
      itemListElement: sourceRecords.map((source, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: source.name,
          url: source.url,
        },
      })),
    },
  ],
};

export default function SourcesPage() {
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
            <p className="eyebrow">Trazabilidad editorial</p>
            <h1>Fuentes del Envite Canario</h1>
            <p>
              Bibliografía anotada y método de un proyecto independiente en
              construcción. Las fuentes se comparan por su aportación y sus
              límites, sin elevar ninguna a reglamento universal.
            </p>
            <a className="button button-primary" href="#bibliografia">
              Ver bibliografía anotada
            </a>
          </div>
        </section>

        <section className="history-intro-band">
          <div className="section-inner history-intro">
            <div>
              <p className="eyebrow">Principio de trabajo</p>
              <h2>Una fuente útil no siempre basta para fijar una regla.</h2>
            </div>
            <div>
              <p>
                El Envite presenta diferencias por isla, municipio, modalidad y
                costumbre de mesa. Por eso una afirmación debe conservar su
                procedencia y no separarse del contexto en el que fue documentada.
              </p>
              <p>
                Este repositorio editorial diferencia coincidencias entre fuentes,
                variantes identificadas, memoria oral, práctica educativa e
                hipótesis pendientes de contraste.
              </p>
              <Link className="text-link" href="/normas-y-variantes">
                Consultar la política de variantes
              </Link>
            </div>
          </div>
        </section>

        <section
          className="evidence-band"
          aria-labelledby="evidence-levels-title"
        >
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Niveles de evidencia</p>
              <h2 id="evidence-levels-title">Qué peso recibe cada referencia.</h2>
              <p>
                El nivel no premia prestigio de marca. Evalúa autoría, método,
                alcance, localización y capacidad para sostener una afirmación
                concreta.
              </p>
            </div>
            <div className="evidence-grid">
              {evidenceLevels.map((level) => (
                <article key={level.title}>
                  <span>Clasificación editorial</span>
                  <h3>{level.title}</h3>
                  <p>{level.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="history-work-band"
          id="bibliografia"
          aria-labelledby="bibliography-title"
        >
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Bibliografía anotada</p>
              <h2 id="bibliography-title">Seis referencias para empezar.</h2>
              <p>
                Todas fueron consultadas el 30 de julio de 2026. Los contenidos
                se parafrasean y los enlaces conducen a la publicación original.
              </p>
            </div>
            <ol className="history-lines">
              {sourceRecords.map((source, index) => (
                <li key={source.url}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{source.name}</h3>
                    <p>
                      <strong>{source.level}.</strong> {source.contribution}
                    </p>
                    <p>
                      <strong>Límite:</strong> {source.limitation}
                    </p>
                    <a
                      className="text-link"
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Consultar la fuente
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="variant-policy-band"
          aria-labelledby="method-title"
        >
          <div className="section-inner variant-policy-layout">
            <div>
              <p className="eyebrow">Método editorial</p>
              <h2 id="method-title">De la referencia a una regla publicable.</h2>
            </div>
            <ol className="variant-policy">
              <li>
                <strong>Identificar</strong>
                <span>
                  Registrar autoría, fecha, territorio, modalidad y propósito de
                  la fuente.
                </span>
              </li>
              <li>
                <strong>Separar</strong>
                <span>
                  Distinguir hecho documentado, regla local, testimonio e
                  hipótesis.
                </span>
              </li>
              <li>
                <strong>Contrastar</strong>
                <span>
                  Comparar referencias y señalar de forma visible las
                  discrepancias.
                </span>
              </li>
              <li>
                <strong>Aplicar</strong>
                <span>
                  Trasladar al motor solo reglas con modalidad y criterio de
                  aceptación definidos.
                </span>
              </li>
              <li>
                <strong>Revisar</strong>
                <span>
                  Mantener fecha de revisión y permitir correcciones trazables
                  sin borrar la versión anterior.
                </span>
              </li>
            </ol>
          </div>
        </section>

        <section className="rules-core-band" aria-labelledby="corrections-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Correcciones futuras</p>
              <h2 id="corrections-title">Canal de revisión en preparación.</h2>
              <p>
                Se publicará una dirección verificable bajo el dominio
                envitecanario.es. Hasta entonces no se mostrará un formulario ni
                se inventará un correo de contacto.
              </p>
            </div>
            <div className="rules-core-grid">
              <article>
                <span className="card-suit">DATO</span>
                <h3>Afirmación concreta</h3>
                <p>Indicar qué frase, término, seña o regla necesita revisión.</p>
              </article>
              <article>
                <span className="card-suit">CONTEXTO</span>
                <h3>Lugar y modalidad</h3>
                <p>Identificar isla, municipio, tamaño de equipo y tipo de mesa.</p>
              </article>
              <article>
                <span className="card-suit">EVIDENCIA</span>
                <h3>Fuente comprobable</h3>
                <p>Aportar publicación, reglamento, testimonio fechado o archivo.</p>
              </article>
              <article>
                <span className="card-suit">TRAZABILIDAD</span>
                <h3>Cambio visible</h3>
                <p>Registrar qué se corrige, por qué y desde qué revisión.</p>
              </article>
            </div>
            <Link className="text-link" href="/informacion-legal">
              Ver información del proyecto
            </Link>
          </div>
        </section>

        <section className="rules-cta-band">
          <div className="section-inner rules-cta">
            <div>
              <p className="eyebrow">Contenido relacionado</p>
              <h2>Lee la guía y consulta cada término.</h2>
            </div>
            <nav aria-label="Contenido editorial relacionado">
              <Link className="button button-dark" href="/como-jugar">
                Cómo jugar
              </Link>
              <Link className="text-link" href="/glosario">
                Glosario
              </Link>
              <Link className="text-link" href="/historia">
                Historia
              </Link>
            </nav>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
