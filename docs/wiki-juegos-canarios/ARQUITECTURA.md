# Arquitectura de la Wiki de Juegos Canarios

## Hipótesis de producto

La Wiki se concibe como un atlas cultural vivo de Canarias: una combinación de archivo editorial, cuaderno de campo y mesa de juego. La identidad debe proceder del contenido, el territorio, las fuentes y los materiales visuales, no de decoración folclórica repetida.

## Rutas

```text
/juegos/                 Índice canónico, búsqueda y filtros
/juegos/[slug]/          Ficha documental estática
/juegos-canarios/        Puerta cultural y compatibilidad histórica
```

Las rutas de fichas se generan estáticamente a partir del registro. Una entrada puede permanecer en el inventario sin generar una página pública.

## Separación de responsabilidades

- El modelo define datos culturales, estados editoriales y referencias.
- El registro reúne el inventario y determina qué fichas se publican.
- El explorador cliente resuelve búsqueda, categoría, isla y orden.
- La ficha se renderiza en servidor y expone metadata y datos estructurados.
- El sitemap se deriva de las fichas publicadas.
- La documentación conserva auditoría, inventario y backlog.

## Estados

### Estado documental

- `documentada`: las afirmaciones principales tienen respaldo suficiente.
- `parcial`: existe información útil, pero quedan huecos identificados.
- `investigacion`: la entrada forma parte del inventario, no de la publicación completa.
- `contradictoria`: las fuentes describen variantes incompatibles que deben mostrarse como tales.
- `revision-pendiente`: contenido válido que necesita actualización.

### Estado de publicación

- `publicada`: genera una ficha indexable.
- `borrador`: puede revisarse en local, pero no debe entrar en sitemap.
- `inventario`: puede aparecer en el índice público únicamente como pista nominal pendiente de contraste; no genera ficha, no expone reglas, equivalencias, territorio ni resumen afirmativo.

Separar ambos estados evita publicar páginas vacías y permite que el inventario sea exhaustivo sin rebajar el rigor.

## Trazabilidad

Las afirmaciones históricas, territoriales y reglamentarias deben incluir identificadores de fuente. Cada identificador debe resolver contra la bibliografía de la ficha. Si dos fuentes discrepan, el contenido no elegirá silenciosamente una versión: explicará las variantes y citará ambas.

## Índice

El índice permite descubrir un juego sin conocer su nombre. Incluye búsqueda por nombre, alias, vocabulario y territorio; filtros compactos de categoría e isla; orden alfabético o por revisión; resultado cuantificado y estado vacío. El diseño usa filas editoriales, no tarjetas SaaS repetidas. Los términos de inventario se buscan con relaciones internas, pero la interfaz no presenta esas relaciones como hechos hasta conciliarlas.

## Ficha

La ficha prioriza la comprensión práctica:

1. Qué es.
2. Cómo se juega.
3. Objetivo, jugadores, material y preparación.
4. Reglas, puntuación y final.
5. Implantación y variantes.
6. Vocabulario.
7. Historia y situación actual.
8. Fuentes y fecha de revisión.
9. Juegos relacionados con relación explicada.

Los campos vacíos no se muestran. El modelo queda preparado para Canarias, isla, comarca y municipio.

## SEO y accesibilidad

- Un `title`, descripción, canonical y Open Graph específicos por ficha.
- JSON-LD coherente con el contenido visible.
- Un solo `h1`, jerarquía semántica y migas de pan.
- Enlaces internos entre juegos relacionados y hacia las fuentes.
- Búsqueda y filtros accesibles por teclado, foco visible y contador anunciado.
- Contraste WCAG AA y respeto a `prefers-reduced-motion`.

## Gate de publicación

1. Reconciliar la copia operativa con el repositorio canónico.
2. Validar integridad del registro, slugs, relaciones y referencias.
3. Ejecutar build normal y exportación estática.
4. Ejecutar pruebas de rutas, metadata, sitemap y contenido.
5. Revisar 320, 390, 768, 1366 y 1440 px.
6. Comprobar teclado, zoom 200 %, filtros, cero resultados y ficha sin imagen.
7. Publicar solo con autorización expresa.
