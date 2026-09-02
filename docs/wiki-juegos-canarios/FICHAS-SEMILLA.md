# Fichas semilla para la Wiki de juegos canarios

Fecha de corte: 2026-09-01
Destino futuro: `data.ts`
Estado: borrador documental, no publicado

## Criterio de uso

Estas fichas contienen únicamente afirmaciones respaldadas por las fuentes indicadas. No son reglamentos ni textos definitivos. Los `sourceIds` permiten conservar la trazabilidad al trasladar los datos a código.

Reglas editoriales:

- Un alias solo se incluye cuando la relación nominal está razonablemente respaldada. Los términos dudosos se presentan como relaciones pendientes, no como alias firmes.
- `territorioAcreditado` indica dónde existe evidencia en este corte; no delimita necesariamente toda la distribución de la práctica.
- `estadoActual` reproduce el nivel documental disponible. No equivale a un censo de practicantes.
- Los campos señalados como vacíos deben mantenerse como `null`, `[]` o cadena vacía en `data.ts` hasta disponer de una fuente suficiente.
- No se deben inferir reglas, materiales, puntuaciones, técnicas, cronologías ni procedencias a partir del nombre o de prácticas parecidas.

## Catálogo de fuentes

| sourceId | Fuente | URL |
|---|---|---|
| S01 | BOC 2026/43, currículo Juegos y deportes tradicionales de Canarias | https://www.gobiernodecanarias.org/boc/2026/043/703.html |
| S02 | Ley 1/2019, de la Actividad Física y el Deporte de Canarias | https://www.gobiernodecanarias.org/boc/2019/027/001.html |
| S03 | Gobierno de Canarias, juegos motores tradicionales | https://www.gobiernodecanarias.org/deportes/materias/programas-proyectos/juegos-deportes-tradicionales/juegos-motores-tradicionales/ |
| S04 | Gobierno de Canarias, juegos de adultos tradicionales | https://www.gobiernodecanarias.org/deportes/materias/programas-proyectos/juegos-deportes-tradicionales/juegos-adultos-tradicionales/index.html |
| S06 | Gobierno de Canarias, enseñanza de la bola canaria | https://www.gobiernodecanarias.org/cmsgob1/export/sites/educacion/web/.content/publicaciones/archivos/documento/Ensenanza-bola-canaria_CEUCD.pdf |
| S07 | Universidad de La Laguna, El léxico del juego del envite | https://riull.ull.es/xmlui/handle/915/21732 |
| S08 | Universidad de La Laguna, Juegos Tradicionales de Inteligencia Canarios | https://riull.ull.es/xmlui/handle/915/45298 |
| S09 | ULPGC, La Dama y El Perro, dos juegos de inteligencia tradicionales canarios | https://mdc.ulpgc.es/files/original/7605755b5e1e5322106401f48960afc644304726.pdf |
| S10 | Cabildo de Fuerteventura, El Sedrés y la Chascona | https://www.cabildofuer.es/documentos/Patrimonio_cultural/libros/tomo_2_de_xviii_jornadas.pdf |
| S11 | Gobierno de Canarias, Pina | https://www3.gobiernodecanarias.org/medusa/wiki/index.php?title=Pina |
| S12 | Gobierno de Canarias, currículo de Bachillerato | https://www.gobiernodecanarias.org/cmsgob1/export/sites/educacion/web/_galerias/descargas/bachillerato/curriculo/nuevo_curriculo/decreto30_2023/juegos_deportes_tradicionales_canarias_BACH.pdf |
| S14 | BOC 1996/147, federaciones de juegos y deportes autóctonos | https://www.gobiernodecanarias.org/boc/1996/147/001.html |
| S15 | Gobierno de Canarias, cuaderno divulgativo de juegos y deportes tradicionales | https://www.gobiernodecanarias.org/cmsgob1/export/sites/deportes/_galerias/descargas/juegos-deportes-tradicionales/1-cuaderno-divulgacion-jdtc.pdf |
| S16 | Universidad de La Laguna, análisis del léxico canario | https://riull.ull.es/xmlui/bitstream/handle/915/10034/cs66.pdf?isAllowed=y&sequence=1 |
| S17 | ULPGC, evaluación del patrimonio etnográfico | https://mdc.ulpgc.es/files/original/64390d017f62ad4ec4552a41f6415e89d4c78306.pdf |
| S18 | CEIP Puerto Cabras, recuperación de juegos tradicionales | https://www3.gobiernodecanarias.org/medusa/edublog/ceippuertocabras/2026/05/26/recuperamos-nuestros-juegos-tradicionales-en-el-ceip-puerto-cabras/ |
| S20 | Gobierno de Canarias, Canarias Patrimonio Lúdico Deportivo | https://www.gobiernodecanarias.org/deportes/materias/programas-proyectos/canarias-patrimonio-ludico-deportivo/ |

## 01. Envite canario

- `name`: Envite canario
- `slug`: `envite-canario`
- `aliases`: Envite
- `relatedNamesNotAliases`: envido; vido, documentados como denominaciones del lance y no como nombres seguros del juego
- `categories`: cartas; salón; sociabilidad
- `shortDescription`: Juego canario de cartas de tradición viva, estudiado académicamente a través de su léxico y de su presencia en espacios de sociabilidad.
- `territorioAcreditado`: Gran Canaria y Tenerife, mediante encuestas académicas; contexto etnográfico adicional en Gran Canaria
- `estadoActual`: vivo y documentado; distribución y vitalidad no cuantificadas
- `sourceIds`: S07, S17

### Hechos trazables

1. La investigación léxica de la Universidad de La Laguna se apoya en encuestas realizadas en Gran Canaria y Tenerife. `[S07]`
2. El estudio lo caracteriza como un juego popular y representativo en Canarias. `[S07]`
3. Envite y zanga aparecen documentados en contextos de cantina y sociabilidad. `[S17]`
4. Las modalidades por número de jugadores o territorio no quedan conciliadas por estas fuentes. `[S07, S17]`

### Fuentes de la ficha

- S07: https://riull.ull.es/xmlui/handle/915/21732
- S17: https://mdc.ulpgc.es/files/original/64390d017f62ad4ec4552a41f6415e89d4c78306.pdf

### Campos que deben quedar vacíos

`rules`, `playerCounts`, `cardRanking`, `matadores`, `scoring`, `signals`, `setup`, `duration`, `islandVariants`, `municipalities`, `originDate`, `originClaim`, `currentOrganizations`

## 02. Bola Canaria

- `name`: Bola Canaria
- `slug`: `bola-canaria`
- `aliases`: ninguno confirmado
- `relatedNamesNotAliases`: bola tradicional; bolas conejeras, denominación contextual; bochas y petanca, prácticas relacionadas pero diferentes
- `categories`: precisión; deporte tradicional
- `shortDescription`: Modalidad canaria de precisión legalmente reconocida y diferenciada por la documentación oficial de las bochas y la petanca.
- `territorioAcreditado`: Canarias; difusión histórica destacada en Lanzarote según la guía institucional
- `estadoActual`: vivo y federado
- `sourceIds`: S02, S06

### Hechos trazables

1. La Ley 1/2019 incluye la Bola Canaria entre los juegos y deportes autóctonos y tradicionales reconocidos. `[S02]`
2. La guía oficial la sitúa en la familia de las bochas, pero la define como juego diferenciado y con peculiaridades propias. `[S06]`
3. La guía señala una difusión histórica especialmente relevante en Lanzarote. `[S06]`
4. El reglamento deportivo de 1992 integró elementos de bola tradicional, bola criolla, bochas y petanca; esto no convierte esos términos en alias. `[S06]`

### Fuentes de la ficha

- S02: https://www.gobiernodecanarias.org/boc/2019/027/001.html
- S06: https://www.gobiernodecanarias.org/cmsgob1/export/sites/educacion/web/.content/publicaciones/archivos/documento/Ensenanza-bola-canaria_CEUCD.pdf

### Campos que deben quedar vacíos

`rules`, `scoring`, `courtDimensions`, `equipmentSpecifications`, `teamSize`, `municipalities`, `islandDistribution`, `historicalTimeline`, `currentFederationData`, `competitionCalendar`

## 03. Lucha Canaria

- `name`: Lucha Canaria
- `slug`: `lucha-canaria`
- `aliases`: ninguno confirmado
- `relatedNamesNotAliases`: ninguno incorporado en este corte
- `categories`: lucha; deporte tradicional
- `shortDescription`: Modalidad de lucha tradicional canaria reconocida legalmente y presente en el currículo y en los programas públicos de patrimonio lúdico-deportivo.
- `territorioAcreditado`: Canarias, sin desglose insular en esta ficha semilla
- `estadoActual`: vivo y federado
- `sourceIds`: S01, S02, S20

### Hechos trazables

1. El currículo autonómico incluye la Lucha Canaria en el repertorio de juegos y deportes tradicionales. `[S01]`
2. La Ley 1/2019 la reconoce expresamente como modalidad autóctona y tradicional. `[S02]`
3. Forma parte del marco institucional Canarias Patrimonio Lúdico Deportivo. `[S20]`

### Fuentes de la ficha

- S01: https://www.gobiernodecanarias.org/boc/2026/043/703.html
- S02: https://www.gobiernodecanarias.org/boc/2019/027/001.html
- S20: https://www.gobiernodecanarias.org/deportes/materias/programas-proyectos/canarias-patrimonio-ludico-deportivo/

### Campos que deben quedar vacíos

`rules`, `techniques`, `weightOrAgeClasses`, `competitionFormat`, `historicalOrigins`, `islandHistory`, `municipalities`, `currentFederationData`, `notablePeople`, `calendar`

## 04. Juego del Palo Canario

- `name`: Juego del Palo Canario
- `slug`: `juego-del-palo-canario`
- `aliases`: Palo Canario
- `relatedNamesNotAliases`: palo chico o macana; palo medio o vara; palo grande; garrote, lata, astia y lanza como denominaciones de implementos o subgrupos, no como alias universales
- `categories`: lucha; palo; práctica tradicional
- `shortDescription`: Práctica tradicional canaria con distintas familias de implementos y una identidad institucional separada de la Lucha del Garrote.
- `territorioAcreditado`: Canarias; estilos y distribuciones insulares pendientes de fuente específica
- `estadoActual`: vivo y federado
- `sourceIds`: S01, S02, S14, S15

### Hechos trazables

1. El currículo distingue palo grande, palo medio o vara y palo chico o macana. `[S01]`
2. La Ley 1/2019 reconoce el Juego del Palo Canario como modalidad propia. `[S02]`
3. La normativa federativa de 1996 trata por separado el Juego del Palo y la Lucha del Garrote. `[S14]`
4. El cuaderno del Gobierno describe diferencias institucionales y competitivas entre ambas prácticas. `[S15]`

### Fuentes de la ficha

- S01: https://www.gobiernodecanarias.org/boc/2026/043/703.html
- S02: https://www.gobiernodecanarias.org/boc/2019/027/001.html
- S14: https://www.gobiernodecanarias.org/boc/1996/147/001.html
- S15: https://www.gobiernodecanarias.org/cmsgob1/export/sites/deportes/_galerias/descargas/juegos-deportes-tradicionales/1-cuaderno-divulgacion-jdtc.pdf

### Campos que deben quedar vacíos

`rules`, `techniques`, `styles`, `schoolNames`, `islandDistribution`, `implementDimensions`, `competitionFormat`, `historicalOrigins`, `municipalities`, `currentOrganizations`

## 05. Lucha del Garrote Canario

- `name`: Lucha del Garrote Canario
- `slug`: `lucha-del-garrote-canario`
- `aliases`: Garrote canario
- `relatedNamesNotAliases`: Juego del Palo Canario, modalidad relacionada pero institucionalmente distinta
- `categories`: lucha; garrote; deporte tradicional
- `shortDescription`: Modalidad canaria de lucha con garrote reconocida legalmente y diferenciada institucionalmente del Juego del Palo.
- `territorioAcreditado`: Canarias, sin desglose insular en esta ficha semilla
- `estadoActual`: vivo y federado
- `sourceIds`: S01, S02, S14, S15

### Hechos trazables

1. La Ley 1/2019 enumera la Lucha del Garrote Canario como modalidad reconocida. `[S02]`
2. La normativa de 1996 contempla estructuras federativas separadas para Garrote y Juego del Palo. `[S14]`
3. El cuaderno institucional asocia la Lucha del Garrote con reglamentación, puntuación y competición. `[S15]`
4. El término garrote también puede aparecer como nombre de un palo grande; ese solapamiento léxico no fusiona las modalidades. `[S01, S15]`

### Fuentes de la ficha

- S01: https://www.gobiernodecanarias.org/boc/2026/043/703.html
- S02: https://www.gobiernodecanarias.org/boc/2019/027/001.html
- S14: https://www.gobiernodecanarias.org/boc/1996/147/001.html
- S15: https://www.gobiernodecanarias.org/cmsgob1/export/sites/deportes/_galerias/descargas/juegos-deportes-tradicionales/1-cuaderno-divulgacion-jdtc.pdf

### Campos que deben quedar vacíos

`rules`, `scoring`, `techniques`, `styles`, `implementDimensions`, `competitionFormat`, `islandDistribution`, `municipalities`, `historicalOrigins`, `currentFederationData`

## 06. Salto del Pastor Canario

- `name`: Salto del Pastor Canario
- `slug`: `salto-del-pastor-canario`
- `aliases`: ninguno confirmado
- `relatedNamesNotAliases`: salto con lanza, descripción genérica; Salto de Vara, candidato separado y no equiparado
- `categories`: habilidad; locomoción rural; deporte tradicional
- `shortDescription`: Práctica tradicional canaria de desplazamiento y habilidad vinculada al uso de un implemento largo, reconocida por la normativa y los programas públicos.
- `territorioAcreditado`: Canarias, sin desglose insular validado en esta ficha
- `estadoActual`: vivo y federado
- `sourceIds`: S01, S02, S20

### Hechos trazables

1. El currículo incluye el Salto del Pastor y también menciona por separado el Salto de Vara. `[S01]`
2. La Ley 1/2019 reconoce el Salto del Pastor Canario como modalidad autóctona y tradicional. `[S02]`
3. La práctica está incluida en el marco Canarias Patrimonio Lúdico Deportivo. `[S20]`

### Fuentes de la ficha

- S01: https://www.gobiernodecanarias.org/boc/2026/043/703.html
- S02: https://www.gobiernodecanarias.org/boc/2019/027/001.html
- S20: https://www.gobiernodecanarias.org/deportes/materias/programas-proyectos/canarias-patrimonio-ludico-deportivo/

### Campos que deben quedar vacíos

`rules`, `techniques`, `safetyInstructions`, `implementNames`, `implementDimensions`, `islandTerminology`, `municipalities`, `historicalOrigins`, `currentOrganizations`, `competitionFormat`

## 07. Pelotamano canaria

- `name`: Pelotamano canaria
- `slug`: `pelotamano-canaria`
- `aliases`: pelota mano canaria, denominación legal
- `relatedNamesNotAliases`: ninguno incorporado en este corte
- `categories`: precisión; cooperación-oposición; juego tradicional adulto
- `shortDescription`: Juego tradicional canario de cooperación y oposición reconocido legalmente y presente en repertorios institucionales.
- `territorioAcreditado`: Canarias; implantación insular y municipal no acreditada en esta ficha
- `estadoActual`: vivo e institucionalmente reconocido; vitalidad no cuantificada
- `sourceIds`: S01, S02, S04

### Hechos trazables

1. El currículo autonómico incluye la Pelotamano entre los juegos y deportes tradicionales. `[S01]`
2. La Ley 1/2019 emplea la denominación «pelota mano canaria» y la reconoce como modalidad. `[S02]`
3. El Gobierno de Canarias la incluye en su catálogo de juegos adultos tradicionales. `[S04]`

### Fuentes de la ficha

- S01: https://www.gobiernodecanarias.org/boc/2026/043/703.html
- S02: https://www.gobiernodecanarias.org/boc/2019/027/001.html
- S04: https://www.gobiernodecanarias.org/deportes/materias/programas-proyectos/juegos-deportes-tradicionales/juegos-adultos-tradicionales/index.html

### Campos que deben quedar vacíos

`rules`, `scoring`, `equipment`, `court`, `teamSize`, `techniques`, `islandDistribution`, `municipalities`, `historicalOrigins`, `currentOrganizations`

## 08. Pina

- `name`: Pina
- `slug`: `pina`
- `aliases`: Juego de la pina
- `relatedNamesNotAliases`: ninguno incorporado en este corte
- `categories`: motor rural; cooperación-oposición; juego histórico
- `shortDescription`: Juego motor tradicional documentado históricamente en varias islas, considerado desaparecido como práctica continua y objeto de recuperación educativa.
- `territorioAcreditado`: Fuerteventura; Tenerife; El Paso, La Palma
- `estadoActual`: histórico o desaparecido como continuidad; con recuperación escolar
- `sourceIds`: S04, S11, S15

### Hechos trazables

1. El Gobierno de Canarias incluye la pina en su catálogo de juegos adultos tradicionales. `[S04]`
2. La síntesis institucional recoge referencias históricas en Fuerteventura, Tenerife y El Paso, La Palma. `[S11]`
3. La investigación citada por el Gobierno la caracteriza como juego tradicional desaparecido. `[S04, S11]`
4. La documentación institucional alude a varias modalidades históricas; no se trasladan sus reglas a esta ficha semilla. `[S11, S15]`

### Fuentes de la ficha

- S04: https://www.gobiernodecanarias.org/deportes/materias/programas-proyectos/juegos-deportes-tradicionales/juegos-adultos-tradicionales/index.html
- S11: https://www3.gobiernodecanarias.org/medusa/wiki/index.php?title=Pina
- S15: https://www.gobiernodecanarias.org/cmsgob1/export/sites/deportes/_galerias/descargas/juegos-deportes-tradicionales/1-cuaderno-divulgacion-jdtc.pdf

### Campos que deben quedar vacíos

`rules`, `variantRules`, `equipment`, `court`, `teamSize`, `scoring`, `chronology`, `continuityEvidence`, `additionalMunicipalities`, `currentOrganizations`

## 09. Billarda

- `name`: Billarda
- `slug`: `billarda`
- `aliases`: ninguno confirmado
- `relatedNamesNotAliases`: variantes de Fuerteventura y del norte de Tenerife, pendientes de denominación y comparación
- `categories`: precisión; infantil-rural; juego motor
- `shortDescription`: Juego motor tradicional presente en el currículo canario y documentado mediante variantes en Fuerteventura y el norte de Tenerife.
- `territorioAcreditado`: Fuerteventura y norte de Tenerife
- `estadoActual`: vivo o recuperado en contextos educativos; continuidad no medida
- `sourceIds`: S01, S03, S12

### Hechos trazables

1. La Billarda forma parte del repertorio curricular de juegos y deportes tradicionales. `[S01, S12]`
2. El catálogo de juegos motores del Gobierno de Canarias la incorpora como práctica tradicional. `[S03]`
3. La documentación educativa distingue referencias de Fuerteventura y del norte de Tenerife. `[S03, S12]`
4. Las variantes insulares no deben recibir una regla unificada sin una comparación específica. `[S03, S12]`

### Fuentes de la ficha

- S01: https://www.gobiernodecanarias.org/boc/2026/043/703.html
- S03: https://www.gobiernodecanarias.org/deportes/materias/programas-proyectos/juegos-deportes-tradicionales/juegos-motores-tradicionales/
- S12: https://www.gobiernodecanarias.org/cmsgob1/export/sites/educacion/web/_galerias/descargas/bachillerato/curriculo/nuevo_curriculo/decreto30_2023/juegos_deportes_tradicionales_canarias_BACH.pdf

### Campos que deben quedar vacíos

`rules`, `variantNames`, `variantRules`, `equipment`, `court`, `teamSize`, `scoring`, `municipalities`, `historicalOrigins`, `continuityEvidence`

## 10. Vela Latina Canaria

- `name`: Vela Latina Canaria
- `slug`: `vela-latina-canaria`
- `aliases`: ninguno confirmado para la familia completa
- `relatedNamesNotAliases`: Vela Latina Canaria de botes; Vela Latina Canaria de barquillos, modalidades diferenciadas
- `categories`: náutico; deporte tradicional; familia de modalidades
- `shortDescription`: Familia náutica tradicional canaria que comprende, al menos en la normativa consultada, las modalidades diferenciadas de botes y de barquillos.
- `territorioAcreditado`: Canarias; sedes y distribuciones insulares pendientes de fuentes federativas
- `estadoActual`: vivo y federado
- `sourceIds`: S01, S02

### Hechos trazables

1. El currículo distingue Vela Latina de botes y Vela Latina de barquillos. `[S01]`
2. La Ley 1/2019 reconoce separadamente ambas modalidades dentro de la vela latina canaria. `[S02]`
3. Botes y barquillos pueden compartir una página de familia, pero sus embarcaciones y reglamentos no deben fusionarse. `[S01, S02]`

### Fuentes de la ficha

- S01: https://www.gobiernodecanarias.org/boc/2026/043/703.html
- S02: https://www.gobiernodecanarias.org/boc/2019/027/001.html

### Campos que deben quedar vacíos

`rules`, `boatSpecifications`, `crewSize`, `competitionFormat`, `clubs`, `federations`, `islandDistribution`, `municipalities`, `historicalOrigins`, `calendar`, `subtypeDetails`

## 11. Chascona

- `name`: Chascona
- `slug`: `chascona`
- `aliases`: ninguno conciliado
- `relatedNamesNotAliases`: Chicochao; Chisqui-Chasque; Chiqui-Chasque; Chiquichasque, relaciones nominales pendientes de resolver
- `categories`: tablero; juego de inteligencia; alineamiento, clasificación provisional
- `shortDescription`: Juego tradicional de inteligencia documentado en Fuerteventura y tratado por la investigación insular como entidad distinta del Sedrés.
- `territorioAcreditado`: Fuerteventura; municipios no cerrados en esta ficha semilla
- `estadoActual`: documentado y en recuperación; vitalidad no medida
- `sourceIds`: S08, S10

### Hechos trazables

1. La investigación del Cabildo de Fuerteventura estudia el Sedrés y la Chascona como dos juegos distintos. `[S10]`
2. El trabajo académico de la ULL presenta Chicochao y chisqui-chasque como posibles denominaciones relacionadas con Chascona. `[S08]`
3. El mismo corpus no permite decidir si Chiquichasque es alias, variante o juego diferente. `[S08, S10]`
4. La evidencia territorial segura para esta ficha es Fuerteventura. `[S10]`

### Fuentes de la ficha

- S08: https://riull.ull.es/xmlui/handle/915/45298
- S10: https://www.cabildofuer.es/documentos/Patrimonio_cultural/libros/tomo_2_de_xviii_jornadas.pdf

### Campos que deben quedar vacíos

`rules`, `board`, `pieces`, `setup`, `objective`, `playerCount`, `aliasResolution`, `municipalities`, `historicalOrigins`, `currentPractice`, `relationshipToChiquichasque`

## 12. Sedrés

- `name`: Sedrés
- `slug`: `sedres`
- `aliases`: Cedrés, variante gráfica prudente
- `relatedNamesNotAliases`: Dama Canaria, familia relacionada; Chascona, juego distinto
- `categories`: tablero; captura; familia de damas o alquerque, clasificación provisional
- `shortDescription`: Juego tradicional de tablero documentado en Fuerteventura, relacionado con la familia de las damas o el alquerque y diferenciado de la Chascona.
- `territorioAcreditado`: Fuerteventura; localidades concretas pendientes de extracción y verificación
- `estadoActual`: documentado y en recuperación
- `sourceIds`: S10, S18

### Hechos trazables

1. La investigación insular documenta el Sedrés y la Chascona como juegos distintos. `[S10]`
2. Sedrés es la forma principal usada por esa investigación; Cedrés se conserva como variante gráfica. `[S10, S18]`
3. Un recurso escolar contemporáneo relaciona Dama Canaria, Cedrés y Sedrés, pero esa equivalencia requiere contraste antes de convertirse en sinonimia. `[S18]`
4. Existe evidencia contemporánea de recuperación educativa en Puerto del Rosario. `[S18]`

### Fuentes de la ficha

- S10: https://www.cabildofuer.es/documentos/Patrimonio_cultural/libros/tomo_2_de_xviii_jornadas.pdf
- S18: https://www3.gobiernodecanarias.org/medusa/edublog/ceippuertocabras/2026/05/26/recuperamos-nuestros-juegos-tradicionales-en-el-ceip-puerto-cabras/

### Campos que deben quedar vacíos

`rules`, `board`, `pieces`, `setup`, `objective`, `playerCount`, `municipalities`, `historicalOrigins`, `currentVitality`, `relationshipToDamaCanaria`

## 13. Dama de veinticuatro

- `name`: Dama de veinticuatro
- `slug`: `dama-de-veinticuatro`
- `aliases`: Dama de doce por jugador
- `relatedNamesNotAliases`: Dama Canaria, página de familia; Dama de cuarenta, variante distinta
- `categories`: tablero; captura; juego de inteligencia
- `shortDescription`: Variante tradicional canaria de la familia de las damas identificada por el total de veinticuatro fichas, diferenciada documentalmente de la Dama de cuarenta.
- `territorioAcreditado`: Canarias y varias islas sin desglose territorial fiable en este corte
- `estadoActual`: documentado y en recuperación; vitalidad no medida
- `sourceIds`: S08, S09

### Hechos trazables

1. La bibliografía académica documenta una Dama tradicional canaria junto con otros juegos de inteligencia. `[S09]`
2. La revisión de la ULL diferencia Dama de veinticuatro y Dama de cuarenta. `[S08]`
3. «Dama Canaria» debe funcionar provisionalmente como página de familia y no como una única regla. `[S08, S09]`
4. El nombre Dama de veinticuatro corresponde a doce fichas por jugador en la clasificación consultada. `[S08]`

### Fuentes de la ficha

- S08: https://riull.ull.es/xmlui/handle/915/45298
- S09: https://mdc.ulpgc.es/files/original/7605755b5e1e5322106401f48960afc644304726.pdf

### Campos que deben quedar vacíos

`rules`, `board`, `setup`, `movement`, `capture`, `objective`, `playerCount`, `islandDistribution`, `municipalities`, `historicalOrigins`, `currentPractice`

## 14. El perro y las cabras

- `name`: El perro y las cabras
- `slug`: `el-perro-y-las-cabras`
- `aliases`: ninguno plenamente conciliado
- `relatedNamesNotAliases`: La encerrona; El perro y la liebre; El gato y las palomas, posibles alias o variantes
- `categories`: tablero; persecución asimétrica; juego de inteligencia
- `shortDescription`: Juego tradicional canario de tablero documentado como práctica asimétrica y relacionado con varias denominaciones cuya equivalencia todavía no está demostrada.
- `territorioAcreditado`: Canarias; recuperación educativa acreditada en Puerto del Rosario, Fuerteventura
- `estadoActual`: documentado y en recuperación; vitalidad no medida
- `sourceIds`: S08, S09, S18

### Hechos trazables

1. La Dama y El Perro aparecen documentados conjuntamente en una publicación etnográfica conservada por la ULPGC. `[S09]`
2. La revisión de la ULL recoge las denominaciones encerrona, perro y liebre, y gato y palomas. `[S08]`
3. Esas denominaciones pueden corresponder a variantes con distinta composición; no deben recibir reglas idénticas sin comprobación. `[S08, S09]`
4. Existe evidencia escolar contemporánea de recuperación en Puerto del Rosario. `[S18]`

### Fuentes de la ficha

- S08: https://riull.ull.es/xmlui/handle/915/45298
- S09: https://mdc.ulpgc.es/files/original/7605755b5e1e5322106401f48960afc644304726.pdf
- S18: https://www3.gobiernodecanarias.org/medusa/edublog/ceippuertocabras/2026/05/26/recuperamos-nuestros-juegos-tradicionales-en-el-ceip-puerto-cabras/

### Campos que deben quedar vacíos

`rules`, `board`, `pieces`, `setup`, `movement`, `capture`, `objective`, `playerCount`, `aliasResolution`, `islandDistribution`, `historicalOrigins`, `currentVitality`

## 15. Zanga

- `name`: Zanga
- `slug`: `zanga`
- `aliases`: ninguno confirmado
- `relatedNamesNotAliases`: seiseño, denominación de una partida de zanga de seis jugadores y no alias general
- `categories`: cartas; salón; sociabilidad
- `shortDescription`: Juego de cartas documentado en Canarias mediante fuentes léxicas y etnográficas, asociado a espacios tradicionales de sociabilidad.
- `territorioAcreditado`: Canarias; contexto etnográfico acreditado en Gran Canaria, sin mapa de distribución cerrado
- `estadoActual`: vivo o documentado; vitalidad actual no medida
- `sourceIds`: S16, S17

### Hechos trazables

1. El léxico canario documenta «seiseño» como una partida de zanga de seis jugadores. `[S16]`
2. La evaluación etnográfica registra la Zanga en contextos de cantina y sociabilidad. `[S17]`
3. Existe evidencia lingüística y etnográfica, pero no se ha incorporado todavía una fuente primaria suficiente para publicar sus reglas. `[S16, S17]`

### Fuentes de la ficha

- S16: https://riull.ull.es/xmlui/bitstream/handle/915/10034/cs66.pdf?isAllowed=y&sequence=1
- S17: https://mdc.ulpgc.es/files/original/64390d017f62ad4ec4552a41f6415e89d4c78306.pdf

### Campos que deben quedar vacíos

`rules`, `deck`, `cardRanking`, `bidding`, `scoring`, `playerCounts`, `setup`, `signals`, `islandDistribution`, `municipalities`, `historicalOrigins`, `currentVitality`

## Control previo a `data.ts`

Antes de convertir estas fichas en datos de producción:

1. Mantener `sourceIds` y el catálogo de fuentes como entidades separadas.
2. Representar `aliases` y `relatedNamesNotAliases` en campos distintos.
3. No sustituir campos vacíos por textos genéricos o inferencias.
4. Añadir un estado editorial por campo, no solo por ficha: `verified`, `provisional`, `conflicted` o `empty`.
5. Someter las reglas futuras a una revisión separada por especialistas o portadores de cada práctica.
