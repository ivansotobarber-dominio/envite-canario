export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  status: string;
  summary: string;
  audience: string;
  plannedContents: string[];
  pending: string[];
};

export const products: Product[] = [
  {
    slug: "baraja-envite-canario",
    name: "Baraja Envite Canario",
    eyebrow: "Producto principal",
    status: "Diseño y prototipo",
    summary:
      "Una baraja propia pensada para jugar al Envite con claridad, resistencia y una identidad canaria reconocible.",
    audience: "Jugadores, familias, asociaciones, bares y organizadores de torneos.",
    plannedContents: [
      "Cartas de juego con jerarquía visual legible.",
      "Dorso original de Envite Canario.",
      "Guía breve de uso y cuidado.",
      "Estuche preparado para transporte frecuente.",
    ],
    pending: [
      "Cerrar diseño final y revisión de reglas.",
      "Validar materiales, impresión y durabilidad.",
      "Comparar proveedores y tirada mínima.",
      "Definir coste, precio y logística antes de abrir ventas.",
    ],
  },
  {
    slug: "pack-mesa-envite-canario",
    name: "Pack Mesa Envite Canario",
    eyebrow: "Experiencia completa",
    status: "Edición en preparación",
    summary:
      "Un conjunto físico para abrir una mesa en casa, en una asociación o durante un encuentro popular.",
    audience: "Familias, colectivos culturales, locales y regalos de grupo.",
    plannedContents: [
      "Baraja Envite Canario.",
      "Tapete de juego plegable.",
      "Marcador físico de partidas.",
      "Guía de inicio rápido.",
    ],
    pending: [
      "Validar medidas y materiales del conjunto.",
      "Diseñar embalaje y protección para envíos.",
      "Probar el pack con jugadores reales.",
      "Cerrar costes de producción y preparación de pedidos.",
    ],
  },
  {
    slug: "tapete-envite-canario",
    name: "Tapete Envite Canario",
    eyebrow: "Mesa y juego",
    status: "Diseño conceptual",
    summary:
      "Una superficie de juego sobria, transportable y preparada para ordenar cartas, marcador y zonas de decisión.",
    audience: "Jugadores habituales, clubes, bares, asociaciones y torneos.",
    plannedContents: [
      "Superficie antideslizante.",
      "Formato apto para mesas domésticas.",
      "Identidad visual discreta.",
      "Sistema de plegado o enrollado por validar.",
    ],
    pending: [
      "Elegir formato y dimensiones.",
      "Probar legibilidad con partidas reales.",
      "Validar resistencia y limpieza.",
      "Definir embalaje y transporte.",
    ],
  },
  {
    slug: "kit-torneo-popular",
    name: "Kit Torneo Popular",
    eyebrow: "Organización",
    status: "En definición",
    summary:
      "Material operativo para que una organización pueda preparar cuadros, mesas, resultados y señalización de un torneo.",
    audience: "Ayuntamientos, comisiones de fiestas, asociaciones, bares y organizadores.",
    plannedContents: [
      "Plantillas de inscripción y cuadros.",
      "Marcadores de mesa.",
      "Identificadores de equipos.",
      "Guía operativa para organización y resultados.",
    ],
    pending: [
      "Contrastar el flujo con organizadores.",
      "Definir modalidades y capacidades.",
      "Separar material físico y material descargable.",
      "Validar bases, protección de datos y publicación de resultados.",
    ],
  },
];

export type NewsPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  published: string;
  isoDate: string;
  paragraphs: string[];
};

export const newsPosts: NewsPost[] = [
  {
    slug: "web-oficial-envite-canario",
    title: "Envite Canario abre la web del proyecto",
    summary:
      "envitecanario.es reúne el desarrollo de la app, la tienda, los torneos y el archivo cultural del proyecto.",
    category: "Proyecto",
    published: "30 de julio de 2026",
    isoDate: "2026-07-30",
    paragraphs: [
      "La web del proyecto nace como punto único de entrada a Envite Canario. Aquí se publicará el estado real de la aplicación, el catálogo de productos, el calendario de torneos verificados, las noticias y el trabajo de documentación histórica.",
      "La primera versión es informativa y no recoge datos personales. La tienda funciona como catálogo en preparación y no permite compras, reservas ni pagos.",
      "El objetivo es avanzar con transparencia: cada área distingue lo que ya está disponible, lo que está en validación y lo que todavía necesita una decisión.",
    ],
  },
  {
    slug: "tienda-envite-canario-en-preparacion",
    title: "La tienda comienza por la baraja y la mesa",
    summary:
      "El catálogo inicial prioriza productos que mejoran la experiencia real de juego antes de ampliar a artículos temáticos.",
    category: "Tienda",
    published: "30 de julio de 2026",
    isoDate: "2026-07-30",
    paragraphs: [
      "La primera línea comercial se centrará en cuatro conceptos: la Baraja Envite Canario, el Pack Mesa, el tapete y el Kit Torneo Popular.",
      "Ningún producto está todavía a la venta. Antes de abrir compras se validarán el diseño, los materiales, la impresión, los proveedores, el embalaje, los costes, la fiscalidad, la logística y las condiciones de devolución.",
      "La prioridad es lanzar pocos productos útiles y bien resueltos. El textil y otras líneas temáticas quedarán para una fase posterior.",
    ],
  },
  {
    slug: "calendario-torneos-populares",
    title: "Preparamos un calendario verificable de torneos populares",
    summary:
      "La agenda solo incorporará convocatorias con organizador, lugar, fecha y fuente identificable.",
    category: "Torneos",
    published: "30 de julio de 2026",
    isoDate: "2026-07-30",
    paragraphs: [
      "Los torneos populares forman parte central del proyecto, pero la agenda no se llenará con datos incompletos ni convocatorias antiguas presentadas como vigentes.",
      "Cada ficha deberá indicar organizador, municipio, isla, fecha, horario, modalidad, estado de inscripción, fuente y fecha de última verificación.",
      "Cuando termine un torneo, la misma ficha podrá conservar resultados y documentación histórica si existe autorización y una fuente trazable.",
    ],
  },
  {
    slug: "webapp-envite-canario-beta-publica",
    title: "La WebApp abre su beta pública",
    summary:
      "La mesa de juego ya puede probarse desde el navegador mientras continúa el trabajo de reglas, ritmo y primera mano guiada.",
    category: "Aplicación",
    published: "30 de julio de 2026",
    isoDate: "2026-07-30",
    paragraphs: [
      "La WebApp ya está disponible para pruebas públicas desde envitecanario.es. El trabajo actual se concentra en una mesa horizontal sin scroll, decisiones claras y una primera mano que pueda completar una persona nueva sin ayuda externa.",
      "La primera versión jugable será local. El juego online, los torneos digitales y la clasificación conectada se incorporarán después de validar que el núcleo funciona y resulta comprensible.",
      "No se publicará una aplicación de tienda que sea un simple envoltorio de la web. La versión instalada deberá aportar una experiencia de juego completa y estable.",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getNewsPost(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}
