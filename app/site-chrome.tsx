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
        <Link href="/#proyecto">Proyecto</Link>
        <Link href="/#hoja-de-ruta">Hoja de ruta</Link>
        <Link href="/#comunidad">Comunidad</Link>
        <Link className="nav-cta" href="/#redes">
          Redes
        </Link>
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
        <Link href="/privacidad">Privacidad</Link>
        <Link href="/informacion-legal">Información del proyecto</Link>
        <Link href="/#redes">Redes oficiales</Link>
      </div>
      <p>© {new Date().getFullYear()} Envite Canario</p>
    </footer>
  );
}
