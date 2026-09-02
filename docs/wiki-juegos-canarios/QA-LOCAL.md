# QA local - Wiki de Juegos Canarios

Fecha de revisión: 2026-09-02

## Alcance

- Índice editorial en `/juegos/`.
- Ruta heredada `/juegos-canarios/`, con canónica hacia `/juegos/`.
- Fichas públicas de Envite Canario, Lucha Canaria, Juego del Palo Canario, Bola Canaria y Salto del Pastor.
- Inventario de trabajo de 59 registros: 52 candidatos del inventario maestro y siete pistas añadidas por petición de Iván, sin convertir automáticamente los registros parciales en fichas públicas.

## Gates técnicos

| Gate | Resultado |
|---|---|
| Lint | Superado, sin errores |
| Tests de aplicación | 10 de 10 superados |
| Build estático para GitHub Pages | Correcto, 35 páginas generadas |
| Tests sobre exportación | 4 de 4 superados |
| Consola de navegador | Sin errores ni avisos |

## Matriz visual

| Vista | Tamaño | Criterios |
|---|---:|---|
| Móvil compacto | 320 x 700 | Superado, sin desbordamiento horizontal |
| Móvil | 390 x 844 | Superado en índice y ficha, sin desbordamiento |
| Tablet | 768 x 1024 | Superado, método editorial y filas adaptados |
| Portátil | 1366 x 768 | Superado, jerarquía completa en el primer viewport |
| Escritorio | 1440 x 900 | Superado en índice y ficha |

## Pruebas funcionales

- Búsqueda por nombre y alias: `Chapolín` devuelve un resultado y conserva `q` en la URL.
- Filtro por categoría: `Juegos infantiles` devuelve diez resultados.
- Filtro por isla documentada: `Fuerteventura` devuelve cuatro resultados.
- Orden alfabético y por revisión.
- Estado vacío y recuperación mediante `Mostrar todo el inventario`.
- Estado de filtros reflejado en la URL.
- Enlaces a fichas únicamente cuando existe contenido publicado.
- Envite Canario es la única ficha con acceso a una experiencia jugable.

## Gate editorial

- Los registros sin fuentes se presentan solo como pistas nominales pendientes de contraste.
- Los alias dudosos no se muestran como equivalencias confirmadas.
- Se diferencian los 52 candidatos del inventario maestro y las siete pistas adicionales.
- La metadata solo anuncia reglas o historia cuando la ficha contiene esos apartados.
- Los resúmenes, participantes, islas y materiales visibles en fichas incorporan referencias.
- Auditoría final independiente: sin bloqueos editoriales materiales.

## Riesgo de integración

Esta implementación vive en la copia de trabajo local `sandbox-personal/working/envite-public-web`, que no contiene el historial Git del repositorio canónico. Antes de publicar debe reconciliarse de forma explícita con `C:\Users\ivans\Desktop\Codex ChatGPT\App Envite\web_public_v0`, revisar las diferencias y repetir todos los gates. No se debe copiar ni desplegar a ciegas.
