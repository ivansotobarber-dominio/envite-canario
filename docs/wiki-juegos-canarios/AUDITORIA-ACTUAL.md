# Auditoría inicial de la Wiki de Juegos Canarios

Fecha de corte: 1 de septiembre de 2026.

## Resumen ejecutivo

La web dispone de una sección cultural en `/juegos-canarios/`, pero todavía no de una Wiki. La página actual contiene cinco entradas incrustadas directamente en el componente, sin fichas independientes, fuentes, taxonomía, búsqueda ni dimensión territorial.

La implementación se realizará primero en la copia operativa local. Esta carpeta no contiene `.git` y difiere del repositorio canónico en varios archivos relevantes. Existe un backup previo en `sandbox-personal/backups/20260901-213005-wiki-juegos-canarios`. Antes de publicar será obligatorio comparar la copia operativa con el repositorio canónico y reconciliar los cambios.

## Contenido existente

| Entrada | Tratamiento actual | Limitación principal |
|---|---|---|
| Envite Canario | Tarjeta con acceso a la WebApp | No es una ficha documental independiente |
| Palo Canario | Tarjeta editorial | Sin fuentes, reglas ni territorio |
| Lucha Canaria | Tarjeta editorial | Sin fuentes, reglas ni situación actual |
| Bola Canaria | Tarjeta editorial | No resuelve su relación terminológica con bochas |
| Salto del Pastor | Tarjeta editorial | Sin fuentes, técnica ni implantación documentada |

Garrote solo aparece mencionado dentro del texto de Palo Canario. No existe una ficha propia ni una decisión editorial documentada sobre si debe tratarse como modalidad, denominación relacionada o entrada independiente.

## Capacidades técnicas reutilizables

- Next.js, React y TypeScript estricto.
- Exportación estática para GitHub Pages.
- Rutas dinámicas con `generateStaticParams` ya utilizadas en noticias y tienda.
- Metadatos, canonical, Open Graph, robots, sitemap y JSON-LD ya implantados.
- `SiteHeader` y `SiteFooter` comunes.
- Playwright configurado para cuatro viewports.

## Carencias

- No existe `/juegos/` ni `/juegos/[slug]/`.
- Los datos están acoplados al componente de presentación.
- No hay búsqueda por nombre, alias o vocabulario.
- No hay filtros por categoría o isla.
- No hay estados documental y de publicación separados.
- No existe trazabilidad entre afirmaciones y fuentes.
- No hay inventario maestro ni backlog documental.
- Las cinco tarjetas idénticas no escalan a un catálogo de 50 a 100 entradas.
- El sitemap solo registra `/juegos-canarios/`.
- Las pruebas solo verifican una frase de la sección existente.

## Decisiones de preservación

- Mantener `/juegos-canarios/` como ruta histórica y puerta cultural.
- Crear `/juegos/` como índice canónico de la Wiki.
- Mantener Envite Canario como único producto jugable.
- Reutilizar el chrome, los tokens de marca y la infraestructura SEO.
- Sustituir la cuadrícula genérica por un índice editorial preparado para crecer.
- No convertir registros de inventario en fichas públicas hasta que tengan evidencia suficiente.

## Riesgo de publicación

La copia operativa local no permite conocer por sí sola qué está ya publicado. La publicación queda fuera de esta fase. El gate de producción deberá incluir comparación contra `main`, revisión de cambios no rastreados, build de exportación, pruebas, QA visual y autorización expresa de Iván.
