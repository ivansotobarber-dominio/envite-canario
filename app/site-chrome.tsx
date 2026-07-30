import Image from "next/image";
import Link from "next/link";
import { assetPath } from "../lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Envite Canario, inicio">
        <Image
          src={assetPath("/images/envite-icon.png")}
          alt=""
          width={44}
          height={44}
          priority
          unoptimized
        />
        <span>Envite Canario</span>
      </Link>
      <nav aria-label="Navegación principal">
        <Link className="nav-play" href="/app">Jugar</Link>
        <Link className="nav-cta" href="/tienda">Tienda</Link>
        <Link href="/torneos">Torneos</Link>
        <Link href="/clasificacion">Clasificación</Link>
        <Link href="/normas-y-variantes">Normas</Link>
        <Link href="/historia">Historia</Link>
        <Link href="/noticias">Noticias</Link>
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
      </div>
      <div className="footer-links">
        <Link href="/app">Jugar</Link>
        <Link href="/tienda">Tienda</Link>
        <Link href="/torneos">Torneos</Link>
        <Link href="/clasificacion">Clasificación</Link>
        <Link href="/normas-y-variantes">Normas y variantes</Link>
        <Link href="/historia">Historia</Link>
        <Link href="/noticias">Noticias</Link>
        <Link href="/privacidad">Privacidad</Link>
        <Link href="/informacion-legal">Información del proyecto</Link>
      </div>
      <p>© {new Date().getFullYear()} Envite Canario</p>
    </footer>
  );
}