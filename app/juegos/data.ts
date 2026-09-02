import type { CanarianGame, GameSource } from "./types";
import { inventorySeeds } from "./inventory-seeds";

const reviewedAt = "2026-09-01";
const reviewedLabel = "1 de septiembre de 2026";

const sources = {
  governmentGuide: {
    id: "gobcan-cuaderno-jdtc",
    title: "Juegos y deportes tradicionales de Canarias",
    organization: "Gobierno de Canarias",
    url: "https://www.gobiernodecanarias.org/cmsgob1/export/sites/deportes/_galerias/descargas/juegos-deportes-tradicionales/1-cuaderno-divulgacion-jdtc.pdf",
    type: "institucional",
    accessedAt: reviewedAt,
  },
  governmentCatalogue: {
    id: "gobcan-boc-2026-043-703",
    title: "Clasificación de juegos y deportes tradicionales de Canarias",
    organization: "Boletín Oficial de Canarias",
    url: "https://www.gobiernodecanarias.org/boc/2026/043/703.html",
    type: "institucional",
    accessedAt: reviewedAt,
  },
  fournierEnvite: {
    id: "fournier-envite",
    title: "Cómo jugar al Envite Canario",
    organization: "Naipe Heraclio Fournier",
    url: "https://www.nhfournier.es/como-jugar/envite-canario/",
    type: "reglamento",
    accessedAt: reviewedAt,
    note: "Referencia operativa principal. Las variantes territoriales requieren contraste adicional.",
  },
  bienmesabeEnvite: {
    id: "bienmesabe-envite",
    title: "El Envite",
    organization: "BienMeSabe.org",
    url: "https://www.bienmesabe.org/noticia/2012/Junio/el-envite",
    type: "articulo",
    accessedAt: reviewedAt,
    note: "Referencia cultural y léxica; debe contrastarse con reglamentos y memoria oral.",
  },
} satisfies Record<string, GameSource>;

const guideSources = [sources.governmentGuide, sources.governmentCatalogue];
const guideRef = [sources.governmentGuide.id];

const empty = {
  municipalities: [],
  comarcas: [],
  preparation: [],
  rules: [],
  scoring: [],
  history: [],
  implantation: [],
  variants: [],
  vocabulary: [],
  currentSituation: [],
} satisfies Partial<CanarianGame>;

const baseGames: CanarianGame[] = [
  {
    slug: "envite-canario",
    name: "Envite Canario",
    aliases: ["Envite"],
    category: "Cartas",
    families: ["Baraja española", "Juego por equipos"],
    summary: "Juego canario de cartas por equipos, con señas, una jerarquía variable de cartas y una fase de envite antes de resolver las manos.",
    publication: "published",
    editorialStatus: "parcialmente-documentada",
    reviewedAt,
    reviewedLabel,
    islands: ["Gran Canaria", "Tenerife"],
    municipalities: [],
    comarcas: [],
    playerCount: "Equipos de 2 a 6 jugadores",
    materials: [{ text: "Baraja española y un sistema físico o digital para arrayar puntos.", sourceIds: [sources.fournierEnvite.id] }],
    objective: { text: "Ganar dos de las tres manos de una ronda y avanzar en la puntuación acordada para la partida.", sourceIds: [sources.fournierEnvite.id] },
    howToPlay: { text: "Dos equipos se sientan en posiciones alternas. Tras repartir tres cartas por persona se descubre la vira, se coordina el equipo mediante señas y se resuelven hasta tres manos.", sourceIds: [sources.fournierEnvite.id] },
    preparation: [
      { text: "Formar dos equipos y colocar a sus integrantes en posiciones alternas.", sourceIds: [sources.fournierEnvite.id] },
      { text: "Barajar, cortar y repartir tres cartas; la carta siguiente queda visible como vira.", sourceIds: [sources.fournierEnvite.id] },
    ],
    rules: [
      { text: "El valor de determinadas cartas cambia según el número de jugadores por equipo.", sourceIds: [sources.fournierEnvite.id] },
      { text: "La carta jugada y las obligaciones de arrastre condicionan qué cartas pueden tirarse después.", sourceIds: [sources.fournierEnvite.id] },
    ],
    scoring: [
      { text: "La fuente consultada describe dos piedras para el equipo que gana dos de las tres manos.", sourceIds: [sources.fournierEnvite.id] },
      { text: "Arrayar es registrar los puntos de la partida; el sistema tradicional puede representarlos con piedras, garbanzos o judías.", sourceIds: [sources.fournierEnvite.id, sources.bienmesabeEnvite.id] },
    ],
    ending: { text: "La estructura de chicos y la puntuación concreta deben fijarse antes de jugar porque existen variantes territoriales y de competición.", sourceIds: [sources.fournierEnvite.id] },
    history: [],
    implantation: [{ text: "Las fuentes consultadas documentan diferencias de puntuación y desarrollo entre Gran Canaria y Tenerife.", sourceIds: [sources.fournierEnvite.id] }],
    variants: [
      { name: "Variante de Gran Canaria", territory: "Gran Canaria", description: "Emplea una progresión de puntuación distinta a la descrita como general por Fournier.", sourceIds: [sources.fournierEnvite.id] },
      { name: "Variante de Tenerife", territory: "Tenerife", description: "La fuente señala que las cartas se recogen después de cada mano.", sourceIds: [sources.fournierEnvite.id] },
    ],
    vocabulary: [
      { term: "Arrayar", definition: "Anotar o registrar puntos en el marcador de la partida.", sourceIds: [sources.fournierEnvite.id, sources.bienmesabeEnvite.id] },
      { term: "Vira", definition: "Carta que queda visible tras el reparto y determina el palo de lo virado.", sourceIds: [sources.fournierEnvite.id] },
      { term: "Tumbo", definition: "Situación de puntuación con reglas específicas para cerrar un chico.", sourceIds: [sources.fournierEnvite.id] },
    ],
    currentSituation: [],
    sources: [sources.fournierEnvite, sources.bienmesabeEnvite],
    relatedSlugs: ["zanga", "ronda"],
    playableHref: "/app",
  },
  {
    ...empty,
    slug: "lucha-canaria",
    name: "Lucha Canaria",
    aliases: [],
    category: "Lucha y palo",
    families: ["Lucha tradicional", "Deporte federado"],
    summary: "Modalidad de lucha tradicional canaria practicada de forma individual dentro de equipos.",
    publication: "published",
    editorialStatus: "parcialmente-documentada",
    reviewedAt, reviewedLabel,
    islands: [],
    playerCount: "Enfrentamientos individuales dentro de equipos",
    materials: [],
    objective: { text: "Hacer que el oponente toque el suelo con una parte del cuerpo distinta de los pies.", sourceIds: guideRef },
    howToPlay: { text: "Dos luchadores se enfrentan en el terrero siguiendo las normas de la modalidad y las decisiones arbitrales.", sourceIds: guideRef },
    sources: guideSources,
    relatedSlugs: ["juego-del-palo-canario"],
  },
  {
    ...empty,
    slug: "juego-del-palo-canario",
    name: "Juego del Palo Canario",
    aliases: ["Palo Canario"],
    category: "Lucha y palo",
    families: ["Esgrima tradicional", "Palo canario"],
    summary: "Práctica tradicional de enfrentamiento y destreza con palo, con modalidades y escuelas que requieren documentación diferenciada.",
    publication: "published",
    editorialStatus: "parcialmente-documentada",
    reviewedAt, reviewedLabel,
    islands: [],
    playerCount: "Dos participantes",
    materials: [{ text: "Palo cuya longitud y denominación dependen de la modalidad.", sourceIds: guideRef }],
    objective: { text: "Desarrollar un intercambio técnico de ataques, defensas y desplazamientos bajo las reglas de la escuela o modalidad.", sourceIds: guideRef },
    sources: guideSources,
    relatedSlugs: ["lucha-canaria", "salto-del-pastor"],
  },
  {
    ...empty,
    slug: "bola-canaria",
    name: "Bola Canaria",
    aliases: [],
    category: "Bola y precisión",
    families: ["Lanzamiento de precisión"],
    summary: "Juego de precisión por equipos en el que se lanzan bolas para aproximarlas a una referencia.",
    publication: "published",
    editorialStatus: "parcialmente-documentada",
    reviewedAt, reviewedLabel,
    islands: [],
    playerCount: "Por equipos",
    materials: [{ text: "Bolas de juego y boliche o referencia de menor tamaño.", sourceIds: guideRef }],
    objective: { text: "Situar las bolas propias más cerca de la referencia que las del equipo contrario.", sourceIds: guideRef },
    sources: guideSources,
    relatedSlugs: ["tangana", "pina"],
  },
  {
    ...empty,
    slug: "salto-del-pastor",
    name: "Salto del Pastor",
    aliases: [],
    category: "Habilidad tradicional",
    families: ["Desplazamiento tradicional", "Práctica pastoril"],
    summary: "Técnica tradicional de desplazamiento por terrenos abruptos mediante una vara larga con regatón.",
    publication: "published",
    editorialStatus: "parcialmente-documentada",
    reviewedAt, reviewedLabel,
    islands: [],
    playerCount: "Práctica individual o en grupo",
    materials: [{ text: "Vara larga provista de regatón; sus nombres y dimensiones varían entre islas.", sourceIds: guideRef }],
    objective: { text: "Facilitar desplazamientos y desniveles en el relieve insular mediante técnicas transmitidas por colectivos especializados.", sourceIds: guideRef },
    sources: guideSources,
    relatedSlugs: ["juego-del-palo-canario"],
  },
  ...[
    ["pelotamano", "Pelotamano", "Juego tradicional de pelota incluido en el catálogo institucional de juegos y deportes de Canarias."],
    ["pina", "Pina", "Juego tradicional rural documentado por el Gobierno de Canarias."],
    ["billarda", "Billarda", "Juego tradicional de golpeo y precisión incluido en los recursos divulgativos del Gobierno de Canarias."],
    ["tangana", "Tángana", "Juego tradicional de lanzamiento y precisión incluido en la clasificación institucional canaria."],
  ].map(([slug, name, summary]) => ({
    ...empty,
    slug,
    name,
    aliases: name === "Pina" ? ["La Pina"] : name === "Tangana" ? ["La Tangana"] : [],
    category: (slug === "pelotamano" ? "Juegos motores" : slug === "pina" || slug === "billarda" ? "Juegos rurales" : "Bola y precisión") as CanarianGame["category"],
    families: ["Juego tradicional"],
    summary,
    publication: "inventory" as const,
    editorialStatus: "parcialmente-documentada" as const,
    reviewedAt,
    reviewedLabel,
    islands: [],
    materials: [],
    sources: guideSources,
    relatedSlugs: ["bola-canaria"],
  })),
];

const baseSlugs = new Set(baseGames.map((game) => game.slug));

const inventoryGames: CanarianGame[] = inventorySeeds
  .filter((seed) => !baseSlugs.has(seed.slug))
  .map((seed) => ({
    ...empty,
    slug: seed.slug,
    name: seed.name,
    aliases: seed.aliases ?? [],
    category: seed.category,
    families: ["Inventario documental"],
    summary: seed.summary,
    publication: "inventory",
    editorialStatus: "en-investigacion",
    reviewedAt,
    reviewedLabel,
    islands: seed.islands ?? [],
    materials: [],
    sources: [],
    relatedSlugs: [],
  }));

export const games: CanarianGame[] = [...baseGames, ...inventoryGames];

export const publishedGames = games.filter((game) => game.publication === "published");

export function getGameBySlug(slug: string) {
  return publishedGames.find((game) => game.slug === slug);
}

export const getGame = getGameBySlug;

export function getRelatedGames(game: CanarianGame) {
  return game.relatedSlugs
    .map((slug) => games.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is CanarianGame => Boolean(candidate));
}
