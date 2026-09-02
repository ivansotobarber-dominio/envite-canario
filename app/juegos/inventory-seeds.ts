import type { CanaryIsland, GameCategory } from "./types";

export type InventorySeed = {
  slug: string;
  name: string;
  aliases?: string[];
  category: GameCategory;
  summary: string;
  islands?: CanaryIsland[];
};

// These records make the documented inventory discoverable. They do not create
// public fichas: evidence, rules and territorial claims remain in the master
// inventory until each entry passes editorial review.
export const inventorySeeds: InventorySeed[] = [
  { slug: "envite-canario", name: "Envite Canario", aliases: ["Envite"], category: "Cartas", islands: ["Gran Canaria", "Tenerife"], summary: "Juego canario de cartas por equipos, con léxico y variantes territoriales documentadas." },
  { slug: "zanga", name: "Zanga", aliases: ["Seiseño"], category: "Cartas", summary: "Juego de cartas y salón con arraigo documentado en espacios de sociabilidad de Canarias." },
  { slug: "ronda", name: "Ronda", category: "Cartas", summary: "Modalidad tradicional de cartas pendiente de localizar y contrastar en fuentes canarias suficientes." },
  { slug: "chascona", name: "Chascona", category: "Tablero e inteligencia", islands: ["Fuerteventura"], summary: "Juego de tablero majorero en recuperación, relacionado con una familia terminológica todavía no conciliada." },
  { slug: "chicochao", name: "Chicochao", category: "Tablero e inteligencia", summary: "Denominación posiblemente relacionada con Chascona; no se publicará como juego independiente hasta resolver la sinonimia." },
  { slug: "chisqui-chasque", name: "Chisqui-Chasque", aliases: ["Chiqui-Chasque", "Chiquichasque"], category: "Tablero e inteligencia", summary: "Nombre de tablero o variante cuya relación con Chascona continúa abierta." },
  { slug: "sedres", name: "Sedrés", aliases: ["Cedrés"], category: "Tablero e inteligencia", islands: ["Fuerteventura"], summary: "Forma majorera documentada de la familia de damas y alquerques, distinta de Chascona." },
  { slug: "dama-canaria", name: "Dama Canaria", category: "Tablero e inteligencia", summary: "Página de familia para variantes canarias de damas; no representa una regla única." },
  { slug: "dama-de-veinticuatro", name: "Dama de veinticuatro", category: "Tablero e inteligencia", summary: "Variante de captura con doce fichas por jugador, pendiente de transcripción documental completa." },
  { slug: "dama-de-cuarenta", name: "Dama de cuarenta", aliases: ["Dama de 40"], category: "Tablero e inteligencia", summary: "Variante de damas con escala y tablero diferenciados de la Dama de veinticuatro." },
  { slug: "dama-de-puerto-de-la-cruz", name: "Dama de Puerto de la Cruz", category: "Tablero e inteligencia", islands: ["Tenerife"], summary: "Variante local documentada mediante un damero de veinticinco cazoletas." },
  { slug: "perro-y-las-cabras", name: "El perro y las cabras", aliases: ["La encerrona", "El perro y la liebre", "El gato y las palomas"], category: "Tablero e inteligencia", summary: "Juego asimétrico de persecución cuyos nombres pueden representar variantes diferentes." },
  { slug: "tres-en-raya-tradicional", name: "Tres en raya tradicional", category: "Tablero e inteligencia", summary: "Práctica compartida con otros territorios cuya materialidad y transmisión canaria deben documentarse." },
  { slug: "rompecabezas-envolvente", name: "Rompecabezas envolvente", aliases: ["Solitario canario"], category: "Tablero e inteligencia", summary: "Solitario documentado en investigación reciente, todavía sin fuente etnográfica primaria suficiente." },
  { slug: "la-estrella", name: "La Estrella", category: "Tablero e inteligencia", summary: "Rompecabezas en estrella pendiente de cronología, procedencia y reglas trazables." },
  { slug: "estrella-cuatro-puntas", name: "Estrella de cuatro puntas", category: "Tablero e inteligencia", summary: "Trazado incluido como candidato del inventario de dameros; reglas y relación con otras estrellas pendientes." },
  { slug: "estrella-cinco-puntas", name: "Estrella de cinco puntas", category: "Tablero e inteligencia", summary: "Trazado incluido como candidato del inventario de dameros; no se infieren reglas desde su geometría." },
  { slug: "estrella-seis-puntas", name: "Estrella de seis puntas", category: "Tablero e inteligencia", summary: "Trazado incluido como candidato del inventario de dameros; identidad lúdica pendiente de confirmar." },
  { slug: "abanico", name: "Abanico", category: "Tablero e inteligencia", summary: "Denominación de juego o damero pendiente de localizar en una fuente primaria suficiente." },
  { slug: "dameros-canarios", name: "Dameros canarios", category: "Tablero e inteligencia", islands: ["Fuerteventura"], summary: "Entrada sobre soportes, grabados y trazados de juego; un damero no permite reconstruir por sí solo una modalidad." },
  { slug: "chapolin-canario", name: "Chapolín Canario", category: "Bola y precisión", summary: "Juego de precisión prioritario para investigación, pendiente de una descripción institucional o académica suficiente." },
  { slug: "bola-canaria", name: "Bola Canaria", category: "Bola y precisión", islands: ["Lanzarote"], summary: "Modalidad canaria de precisión legalmente reconocida y diferenciada de bochas y petanca." },
  { slug: "bochas", name: "Bochas", aliases: ["Bocha"], category: "Bola y precisión", summary: "Práctica relacionada con la Bola Canaria, incluida para control terminológico y no como sinónimo." },
  { slug: "tangana", name: "Tángana", category: "Bola y precisión", islands: ["Tenerife"], summary: "Juego tradicional de lanzamiento; la relación del término teje no es universal y requiere matices." },
  { slug: "pelotamano", name: "Pelotamano canaria", aliases: ["Pelota mano canaria"], category: "Juegos motores", summary: "Juego tradicional de pelota reconocido institucionalmente, pendiente de una monografía de reglas." },
  { slug: "pina", name: "Pina", aliases: ["Juego de la pina"], category: "Juegos rurales", islands: ["Fuerteventura", "Tenerife", "La Palma"], summary: "Práctica histórica desaparecida como continuidad comunitaria y recuperada en contextos educativos." },
  { slug: "billarda", name: "Billarda", category: "Juegos rurales", islands: ["Fuerteventura", "Tenerife"], summary: "Juego tradicional de golpeo con variantes documentadas en Fuerteventura y el norte de Tenerife." },
  { slug: "lucha-canaria", name: "Lucha Canaria", category: "Lucha y palo", summary: "Modalidad de lucha tradicional viva, legalmente reconocida y federada." },
  { slug: "juego-del-palo-canario", name: "Juego del Palo Canario", aliases: ["Palo Canario"], category: "Lucha y palo", summary: "Práctica viva con modalidades y escuelas propias, distinta institucionalmente de la Lucha del Garrote." },
  { slug: "lucha-del-garrote-canario", name: "Lucha del Garrote Canario", aliases: ["Garrote canario"], category: "Lucha y palo", summary: "Modalidad legalmente diferenciada del Juego del Palo, con reglamentación, puntuación y competición propias." },
  { slug: "salto-del-pastor", name: "Salto del Pastor Canario", aliases: ["Salto con lanza"], category: "Habilidad tradicional", summary: "Práctica viva de desplazamiento vinculada al relieve, al pastoreo y a terminologías insulares." },
  { slug: "salto-de-vara", name: "Salto de Vara", category: "Habilidad tradicional", summary: "Modalidad reconocida en el currículo cuya relación técnica con el Salto del Pastor necesita una fuente monográfica." },
  { slug: "levantamiento-de-piedra", name: "Levantamiento de piedra", category: "Habilidad tradicional", summary: "Práctica de fuerza reconocida en el repertorio institucional de Canarias." },
  { slug: "pulseo-de-piedra", name: "Pulseo de piedra", category: "Habilidad tradicional", summary: "Acción de fuerza diferenciada del levantamiento de piedra en las fuentes curriculares." },
  { slug: "lanzamiento-de-piedras", name: "Lanzamiento de piedras", aliases: ["Tiro de piedra"], category: "Habilidad tradicional", summary: "Práctica histórica y educativa para la que no debe presentarse una regla universal." },
  { slug: "esquiva-de-piedras", name: "Esquiva de piedras", category: "Habilidad tradicional", summary: "Práctica histórica relacionada con el lanzamiento, documentada solo con enfoque patrimonial y educativo." },
  { slug: "levantamiento-del-arado", name: "Levantamiento del arado canario", category: "Juegos rurales", summary: "Modalidad de fuerza rural viva e institucionalmente reconocida." },
  { slug: "arrastre-canario", name: "Arrastre canario", aliases: ["Arrastre de ganado"], category: "Juegos rurales", summary: "Modalidad rural reglada cuya ficha deberá incorporar el marco actual de bienestar animal." },
  { slug: "calabazo-canario", name: "Calabazo canario", aliases: ["Riego al calabazo"], category: "Juegos rurales", summary: "Práctica vinculada a un sistema tradicional de riego y a su formalización lúdico-deportiva." },
  { slug: "vela-latina-botes", name: "Vela Latina Canaria de botes", category: "Náutica", summary: "Modalidad legalmente diferenciada de la Vela Latina Canaria." },
  { slug: "vela-latina-barquillos", name: "Vela Latina Canaria de barquillos", category: "Náutica", summary: "Modalidad de Vela Latina Canaria con embarcaciones y reglamento propios." },
  { slug: "carros-de-madera", name: "Carros de madera canarios", aliases: ["Carritos de madera", "Carretones de madera"], category: "Juegos motores", summary: "Práctica de descenso que debe distinguirse del juguete infantil y de sus denominaciones locales." },
  { slug: "tablas-de-san-andres", name: "Tablas de San Andrés", category: "Juegos motores", summary: "Práctica festiva de deslizamiento cuya implantación municipal se documentará con fuentes locales específicas." },
  { slug: "cucana", name: "Cucaña", aliases: ["Palo ensebado"], category: "Habilidad tradicional", summary: "Práctica festiva compartida con otros territorios, con presencia y variantes canarias documentables." },
  { slug: "calimbre", name: "Calimbre", category: "Juegos infantiles", summary: "Juego infantil reconocido en el repertorio oficial, todavía sin descripción primaria suficiente." },
  { slug: "a-la-corriente", name: "A la Corriente", category: "Juegos infantiles", summary: "Juego infantil del repertorio oficial pendiente de mecánica y territorio documentados." },
  { slug: "a-la-guerra", name: "A la Guerra", category: "Juegos infantiles", summary: "Denominación infantil ambigua que requiere una fuente primaria antes de publicar reglas." },
  { slug: "juegos-de-piola", name: "Juegos de piola", category: "Juegos infantiles", summary: "Familia de juegos de salto; no se presenta como una sola regla universal." },
  { slug: "cho-juan-de-la-cajeta", name: "Cho Juan de la Cajeta", category: "Juegos infantiles", summary: "Denominación conservada desde el BOC, con grafía y mecánica pendientes de investigación oral o lexicográfica." },
  { slug: "el-molle", name: "El Molle", category: "Juegos infantiles", summary: "Nombre infantil reconocido en el repertorio oficial, pero todavía demasiado ambiguo para una ficha." },
  { slug: "las-chapas", name: "Las Chapas", category: "Juegos infantiles", summary: "Familia de juegos con chapas cuyas variantes deben distinguirse antes de describirlas." },
  { slug: "boliche-infantil", name: "Boliche infantil", aliases: ["Birula", "Bolitura", "Bonitura"], category: "Juegos infantiles", islands: ["Lanzarote", "Fuerteventura", "Gran Canaria", "Tenerife"], summary: "Familia infantil de precisión que no debe confundirse con el boliche de la Bola Canaria." },
  { slug: "trompo", name: "Trompo", aliases: ["Peonza"], category: "Juegos infantiles", summary: "Práctica extendida cuya ficha debe centrarse en materiales, vocabulario y transmisión local en Canarias." },
  { slug: "santorra", name: "Santorra", aliases: ["Juego del clavo"], category: "Juegos infantiles", summary: "Juego de precisión infantil con equivalencia terminológica todavía pendiente de contraste lexicográfico." },
  { slug: "pulso-de-manos", name: "Pulso de manos", aliases: ["Pulsos"], category: "Habilidad tradicional", summary: "Práctica de fuerza de salón que no debe confundirse con el pulseo de piedra." },
  { slug: "carreras-de-caballos", name: "Carreras de caballos tradicionales", category: "Juegos motores", summary: "Práctica tradicional que requiere historia local, distinción deportiva y marco de bienestar animal." },
  { slug: "carreras-de-sortijas", name: "Carreras de sortijas o cintas", aliases: ["Carrera de cintas"], category: "Juegos motores", summary: "Práctica festiva de precisión compartida con otros territorios y documentada en Canarias." },
  { slug: "peleas-de-gallos", name: "Peleas de gallos", category: "Histórico", summary: "Entrada exclusivamente histórico-cultural; nunca incluirá instrucciones ni recreación práctica." },
  { slug: "peleas-de-carneros", name: "Peleas de carneros", category: "Histórico", summary: "Entrada exclusivamente histórica para documentar una práctica y su cambio normativo." },
];
