# Migracion DNS de envitecanario.es a GitHub Pages

Fecha: 2026-07-29
Proveedor DNS: OVHcloud
Repositorio: https://github.com/ivansotobarber-dominio/envite-canario

## Registros web originales archivados

- `@ A 213.186.33.5`
- `www A 213.186.33.5`
- `www TXT "3|welcome"`
- `@ TXT "1|www.envitecanario.es"`

Los registros de correo, nombres de servidor y servicios auxiliares no forman
parte de esta migracion y deben permanecer sin cambios.

## Configuracion objetivo

- `@ A 185.199.108.153`
- `@ A 185.199.109.153`
- `@ A 185.199.110.153`
- `@ A 185.199.111.153`
- `www CNAME ivansotobarber-dominio.github.io.`
- `_github-pages-challenge-ivansotobarber-dominio TXT "f4011b1afac1e2c8fcab8fab08d30d"`

El TXT de redireccion de la raiz se conserva mientras no se demuestre un
conflicto real. Los registros `www A` y `www TXT` deben retirarse porque un
`CNAME` no puede coexistir con otros registros en el mismo nombre.
