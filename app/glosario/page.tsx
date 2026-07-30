import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

const siteUrl = "https://envitecanario.es";

const terms = [
  {
    id: "arrastre",
    term: "Arrastre",
    label: "Mecánica",
    definition:
      "Salida con una carta de triunfo o de lo virado que obliga a servir con cartas de esa condición cuando se dispone de ellas. Las excepciones y sanciones dependen de la modalidad.",
    source:
      "Principal: ULL (2002); contraste: Fournier y descripción local de Lanzarote",
  },
  {
    id: "arrayar",
    term: "Arrayar",
    label: "Tanteo",
    definition:
      "Anotar piedras o tantos a favor de un equipo. La forma material de llevar la cuenta y sus equivalencias cambian según la mesa.",
    source: "Principal: ULL (2002); contraste: BienMeSabe y Fournier",
  },
  {
    id: "baza-mano",
    term: "Baza y mano",
    label: "Uso editorial",
    definition:
      "Baza se usa aquí para cada vuelta en la que todas las personas juegan una carta. Algunas fuentes emplean mano con ese sentido o para una unidad mayor, por lo que conviene declarar el uso.",
    source:
      "Principal: ULL (2002), que documenta balsa y base como formas vinculadas a baza",
  },
  {
    id: "chico",
    term: "Chico",
    label: "Tanteo",
    definition:
      "Unidad de puntuación superior a las piedras. El número de piedras necesarias y la estructura de la partida no deben darse por universales.",
    source:
      "Principal: ULL (2002); contraste: BienMeSabe, Fournier y Lanzarote",
  },
  {
    id: "chico-fuera",
    term: "Chico fuera",
    label: "Envite",
    definition:
      "Reto de máxima intensidad que compromete el chico en las variantes descritas. La secuencia previa de subidas debe acordarse antes de jugar.",
    source:
      "Principal: ULL (2002); contraste: BienMeSabe, Fournier y Lanzarote",
  },
  {
    id: "chilasco",
    term: "Chilasco",
    label: "Variante léxica",
    definition:
      "Nombre dado en varias descripciones a una carta del palo de la vira. Su valor se ordena por debajo de los matadores o triunfos especiales de la modalidad.",
    source:
      "Principal: ULL (2002); contraste: Fournier y descripción local de Lanzarote",
  },
  {
    id: "ciego",
    term: "Ciego",
    label: "Seña",
    definition:
      "Situación en la que una persona no lleva triunfos. Algunas fuentes locales asocian el estado al gesto de cerrar los ojos.",
    source:
      "Principal: ULL (2002), que registra ceguera y cieguera; contraste: BienMeSabe y Lanzarote",
  },
  {
    id: "envite",
    term: "Envite, envido y envío",
    label: "Variante territorial",
    definition:
      "Reto que eleva lo que se disputa y exige respuesta del equipo contrario. Las formas envido y envío aparecen vinculadas a usos territoriales distintos.",
    source:
      "Principal: ULL (2002); contraste: Academia Canaria de la Lengua y BienMeSabe",
  },
  {
    id: "flus",
    term: "Flus o flu",
    label: "Variante léxica",
    definition:
      "Expresión aplicada en algunas descripciones a una mano con tres cartas fuertes o triunfos. No debe trasladarse a todas las modalidades sin contraste.",
    source:
      "Principal: ULL (2002), que registra flux; contraste: BienMeSabe y Lanzarote",
  },
  {
    id: "mala",
    term: "Mala o malilla",
    label: "Jerarquía variable",
    definition:
      "Nombre dado al dos en el estudio léxico de Gran Canaria y Tenerife. En las reglas operativas consultadas, la malilla de lo virado puede ser la carta principal en mesas pequeñas y perder prioridad cuando se incorporan matadores fijos.",
    source:
      "Principal: ULL (2002); contraste: BienMeSabe, Fournier y Lanzarote",
  },
  {
    id: "mandador",
    term: "Mandador",
    label: "Equipo",
    definition:
      "Persona que coordina el juego de su bando a partir de las señas y decide o encarga los envites. La organización exacta puede variar entre mesas.",
    source:
      "Principal: ULL (2002), que también recoge capitán y jefe; contraste: BienMeSabe y Lanzarote",
  },
  {
    id: "matador",
    term: "Matador",
    label: "Jerarquía variable",
    definition:
      "Carta de fuerza especial que se incorpora en determinadas modalidades. Su identidad y posición dependen del número de participantes y de la variante.",
    source: "Principal: ULL (2002); contraste: BienMeSabe y Fournier",
  },
  {
    id: "perica",
    term: "Perica",
    label: "Variante léxica",
    definition:
      "Nombre asociado a la sota de oros como carta especial en algunas modalidades. BienMeSabe también documenta un uso más amplio para las sotas.",
    source:
      "Principal: ULL (2002); contraste: BienMeSabe, Fournier y Lanzarote",
  },
  {
    id: "piedras",
    term: "Piedras",
    label: "Tanteo",
    definition:
      "Unidades con las que se registra la puntuación, a menudo representadas con piedras, garbanzos u otros marcadores. Sus equivalencias dependen del sistema acordado.",
    source: "Principal: ULL (2002); contraste: BienMeSabe y Fournier",
  },
  {
    id: "renuncio",
    term: "Renuncio",
    label: "Infracción",
    definition:
      "Incumplimiento de una obligación de juego, como no servir al arrastre cuando corresponde. La sanción concreta cambia entre descripciones y debe fijarse antes de la partida.",
    source:
      "Principal: ULL (2002); contraste: Fournier y descripción local de Lanzarote",
  },
  {
    id: "senas",
    term: "Señas",
    label: "Comunicación",
    definition:
      "Gestos mediante los que una persona comunica información de sus cartas al equipo. Son una característica central del juego, pero su repertorio cambia con el territorio y la modalidad.",
    source:
      "Principal: ULL (2002); contraste: Academia Canaria de la Lengua y fuentes operativas",
  },
  {
    id: "tumbo",
    term: "Tumbo",
    label: "Tanteo variable",
    definition:
      "Situación decisiva cercana al cierre de un chico. El umbral, la decisión de jugar y las consecuencias de ganar o perder presentan variantes.",
    source:
      "Principal: ULL (2002); contraste: BienMeSabe, Fournier y Lanzarote",
  },
  {
    id: "vira",
    term: "Vira y lo virado",
    label: "Mecánica",
    definition:
      "La vira es la carta visible que determina un palo de referencia en las versiones consultadas. Las cartas de ese palo se denominan de lo virado y reciben una fuerza especial.",
    source:
      "Principal: ULL (2002); contraste: Fournier y descripción local de Lanzarote",
  },
] as const;

export const metadata: Metadata = {
  title: "Glosario del Envite Canario: términos y variantes",
  description:
    "Significado prudente de arrastre, arrayar, chico, chilasco, envite, malilla, mandador, señas, tumbo, vira y otros términos del Envite Canario.",
  keywords: [
    "glosario envite canario",
    "qué significa tumbo envite",
    "malilla envite canario",
    "chilasco envite",
    "señas envite canario",
  ],
  alternates: {
    canonical: "/glosario",
  },
  openGraph: {
    title: "Glosario del Envite Canario",
    description:
      "Términos del juego explicados con contexto, fuente y marca de variante.",
    type: "article",
    locale: "es_ES",
    url: `${siteUrl}/glosario/`,
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
          name: "Glosario",
          item: `${siteUrl}/glosario/`,
        },
      ],
    },
    {
      "@type": "DefinedTermSet",
      name: "Glosario del Envite Canario",
      description:
        "Términos del Envite Canario con contexto territorial y metodológico.",
      url: `${siteUrl}/glosario/`,
      inLanguage: "es",
      hasDefinedTerm: terms.map((item) => ({
        "@type": "DefinedTerm",
        name: item.term,
        description: item.definition,
        url: `${siteUrl}/glosario#${item.id}`,
        inDefinedTermSet: `${siteUrl}/glosario/`,
      })),
    },
  ],
};

export default function GlossaryPage() {
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
            <p className="eyebrow">Palabras de la mesa</p>
            <h1>Glosario del Envite Canario</h1>
            <p>
              Términos para entender el juego sin borrar sus diferencias
              territoriales. Cada definición indica su uso, sus límites y la
              referencia de la que procede.
            </p>
            <a className="button button-primary" href="#terminos">
              Consultar términos
            </a>
          </div>
        </section>

        <section className="history-intro-band">
          <div className="section-inner history-intro">
            <div>
              <p className="eyebrow">Criterio editorial</p>
              <h2>Una palabra puede cambiar de mesa en mesa.</h2>
            </div>
            <div>
              <p>
                El léxico es una parte esencial del patrimonio del Envite.
                También es una fuente de confusión cuando un término local se
                presenta como si tuviera un único significado en toda Canarias.
              </p>
              <p>
                Este glosario pertenece a un proyecto independiente en
                construcción. No sustituye un reglamento de torneo ni atribuye
                autoridad universal a una fuente concreta.
              </p>
              <Link className="text-link" href="/fuentes">
                Ver metodología editorial
              </Link>
            </div>
          </div>
        </section>

        <section className="modes-band" id="terminos" aria-labelledby="terms-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">De la A a la V</p>
              <h2 id="terms-title">Términos, contexto y procedencia.</h2>
              <p>
                Las marcas de variante no son notas menores. Indican cuándo una
                definición necesita territorio, modalidad o tanteo antes de
                aplicarse.
              </p>
            </div>
            <div className="modes-table">
              {terms.map((item) => (
                <article id={item.id} key={item.id}>
                  <h3>{item.term}</h3>
                  <span>{item.label}</span>
                  <p>
                    {item.definition} <strong>Referencia:</strong> {item.source}.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="variant-policy-band"
          aria-labelledby="reading-policy-title"
        >
          <div className="section-inner variant-policy-layout">
            <div>
              <p className="eyebrow">Cómo leer el glosario</p>
              <h2 id="reading-policy-title">Cuatro marcas para no mezclar reglas.</h2>
            </div>
            <ul className="variant-policy">
              <li>
                <strong>Mecánica</strong>
                <span>
                  Concepto necesario para comprender la secuencia de la partida.
                </span>
              </li>
              <li>
                <strong>Variante léxica</strong>
                <span>
                  Palabra cuyo uso o alcance puede cambiar según el territorio.
                </span>
              </li>
              <li>
                <strong>Jerarquía variable</strong>
                <span>
                  Carta o valor que depende del tamaño de los equipos.
                </span>
              </li>
              <li>
                <strong>Tanteo variable</strong>
                <span>
                  Regla que requiere conocer el sistema de piedras y chicos.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="rules-cta-band">
          <div className="section-inner rules-cta">
            <div>
              <p className="eyebrow">Del término a la partida</p>
              <h2>Aprende el flujo básico paso a paso.</h2>
            </div>
            <Link className="button button-dark" href="/como-jugar">
              Ver cómo jugar
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
