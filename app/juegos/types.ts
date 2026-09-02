export const GAME_CATEGORIES = [
  "Cartas",
  "Tablero e inteligencia",
  "Bola y precisión",
  "Juegos motores",
  "Juegos rurales",
  "Lucha y palo",
  "Habilidad tradicional",
  "Juegos infantiles",
  "Náutica",
  "Histórico",
  "Otros",
] as const;

export const CANARY_ISLANDS = [
  "El Hierro",
  "Fuerteventura",
  "Gran Canaria",
  "La Gomera",
  "La Graciosa",
  "La Palma",
  "Lanzarote",
  "Tenerife",
] as const;

export type GameCategory = (typeof GAME_CATEGORIES)[number];
export type CanaryIsland = (typeof CANARY_ISLANDS)[number];
export type EditorialStatus =
  | "documentada"
  | "parcialmente-documentada"
  | "en-investigacion"
  | "fuentes-contradictorias"
  | "revision-pendiente";
export type PublicationStatus = "published" | "inventory";

export type GameSource = {
  id: string;
  title: string;
  organization: string;
  url: string;
  type: "institucional" | "reglamento" | "articulo" | "recurso-educativo";
  accessedAt: string;
  note?: string;
};

export type SourcedText = { text: string; sourceIds: string[] };
export type GameVariant = {
  name: string;
  territory?: string;
  description: string;
  sourceIds: string[];
};
export type GameVocabulary = {
  term: string;
  definition: string;
  sourceIds: string[];
};

export type CanarianGame = {
  slug: string;
  name: string;
  aliases: string[];
  category: GameCategory;
  families: string[];
  summary: string;
  publication: PublicationStatus;
  editorialStatus: EditorialStatus;
  reviewedAt: string;
  reviewedLabel: string;
  islands: CanaryIsland[];
  municipalities: string[];
  comarcas: string[];
  playerCount?: string;
  materials: SourcedText[];
  objective?: SourcedText;
  howToPlay?: SourcedText;
  preparation: SourcedText[];
  rules: SourcedText[];
  scoring: SourcedText[];
  ending?: SourcedText;
  history: SourcedText[];
  implantation: SourcedText[];
  variants: GameVariant[];
  vocabulary: GameVocabulary[];
  currentSituation: SourcedText[];
  sources: GameSource[];
  relatedSlugs: string[];
  playableHref?: string;
};
