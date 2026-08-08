import Image from "next/image";
import Link from "next/link";
import { assetPath } from "../lib/site";

const discoveryLinks = [
  { href: "/juegos-canarios", label: "Juegos Canarios" },
  { href: "/torneos", label: "Torneos" },
  { href: "/clasificacion", label: "Clasificación" },
  { href: "/como-jugar", label: "Cómo jugar" },
  { href: "/normas-y-variantes", label: "Normas y variantes" },
  { href: "/glosario", label: "Glosario" },
  { href: "/historia", label: "Historia" },
  { href: "/noticias", label: "Noticias" },
  { href: "/fuentes", label: "Fuentes" },
  { href: "/redes-sociales", label: "Redes" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Envite Canario, inicio">
        <Image
          src={assetPath("/images/envite-icon.webp")}
          alt=""
          width={44}
          height={44}
          priority
          unoptimized
        />
        <span>Envite Canario</span>
      </Link>
      <nav className="primary-nav" aria-label="Navegación principal">
        <Link className="nav-play" href="/app">Jugar</Link>
        <Link className="nav-cta" href="/tienda">Tienda</Link>
        <details className="nav-more">
          <summary>Explorar</summary>
          <div className="nav-menu">
            {discoveryLinks.map((item) => (
              <Link href={item.href} key={item.href}>{item.label}</Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <strong>Envite Canario</strong>
        <span>Jugar. Aprender. Conservar la mesa.</span>
        <small>Canal propio de un proyecto independiente.</small>
      </div>
      <nav className="footer-directory" aria-label="Directorio de Envite Canario">
        <div className="footer-column">
          <strong>Jugar y competir</strong>
          <Link href="/app">Jugar</Link>
          <Link href="/torneos">Torneos</Link>
          <Link href="/clasificacion">Clasificación</Link>
        </div>
        <div className="footer-column">
          <strong>Aprender</strong>
          <Link href="/como-jugar">Cómo jugar</Link>
          <Link href="/normas-y-variantes">Normas y variantes</Link>
          <Link href="/glosario">Glosario</Link>
        </div>
        <div className="footer-column">
          <strong>Cultura y proyecto</strong>
          <Link href="/juegos-canarios">Juegos Canarios</Link>
          <Link href="/historia">Historia</Link>
          <Link href="/noticias">Noticias</Link>
          <Link href="/fuentes">Fuentes</Link>
          <Link href="/informacion-legal">Información del proyecto</Link>
        </div>
        <div className="footer-column">
          <strong>Comunidad</strong>
          <Link href="/tienda">Tienda</Link>
          <Link href="/redes-sociales">Redes</Link>
          <Link href="/redes-sociales#instagram">Instagram</Link>
          <Link href="/redes-sociales#facebook">Facebook</Link>
          <Link href="/redes-sociales#x">X</Link>
          <Link href="/redes-sociales#youtube">YouTube</Link>
          <Link href="/privacidad">Privacidad</Link>
        </div>
      </nav>
      <p>© {new Date().getFullYear()} Proyecto Envite Canario</p>
    </footer>
  );
}
