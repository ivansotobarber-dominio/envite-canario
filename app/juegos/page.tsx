import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { games } from "./data";
import { WikiIndex } from "./wiki-index";
import { playableBetas } from "./betas";
import styles from "./wiki.module.css";

const description = "Atlas documental de juegos, deportes y prácticas tradicionales de Canarias, con fuentes, variantes territoriales y fichas en revisión continua.";

export const metadata: Metadata = {
  title: "Wiki de Juegos Canarios",
  description,
  alternates: { canonical: "/juegos" },
  openGraph: { type: "website", url: "/juegos", title: "Wiki de Juegos Canarios", description },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Wiki de Juegos Canarios",
  url: "https://envitecanario.es/juegos/",
  inLanguage: "es",
  description,
  numberOfItems: games.length,
  about: games.map((game) => ({ "@type": "Thing", name: game.name })),
};

export default function JuegosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className={styles.wikiPage}>
        <header className={styles.atlasHeader}>
          <div className={styles.atlasIndex} aria-hidden="true"><span>28° N</span><span>ARCHIVO 001</span><span>CANARIAS</span></div>
          <div className={styles.atlasIntro}><p className={styles.kicker}>Atlas cultural vivo</p><h1>Wiki de Juegos Canarios</h1><p className={styles.lead}>Un archivo abierto para localizar, entender y contrastar los juegos, deportes y prácticas que forman parte de la cultura lúdica de Canarias.</p></div>
          <aside className={styles.methodNote} aria-label="Método editorial"><strong>No damos por cerrada una tradición viva.</strong><p>Cada ficha separa hechos documentados, variantes y preguntas pendientes. Las fuentes se muestran al final y se indica la fecha de revisión.</p><a href="#metodo">Cómo documentamos</a></aside>
        </header>
        <section className={styles.enviteBridge} id="betas" aria-labelledby="betas-title"><div><p className={styles.kicker}>Jugar en el navegador</p><h2 id="betas-title">Envite, Lucha Canaria y Bola Canaria.</h2><p>Lucha y Bola son betas experimentales, sin homologación ni validación deportiva. Sin cuentas ni telemetría.</p></div><nav className={styles.betaLinks} aria-label="Juegos y betas"><Link href="/app">Abrir la mesa de Envite</Link>{playableBetas.map((beta) => <Link key={beta.slug} href={`/juegos/${beta.slug}/`}>{beta.name} · Ver beta</Link>)}</nav></section>
        <WikiIndex games={games} />
        <section className={styles.method} id="metodo" aria-labelledby="method-title">
          <div><p className={styles.kicker}>Método editorial</p><h2 id="method-title">Escuchar, contrastar y publicar con trazabilidad.</h2></div>
          <ol><li><span>01</span><strong>Inventariar</strong><p>Registrar nombres, alias y lugares sin convertir una referencia aislada en una regla general.</p></li><li><span>02</span><strong>Contrastar</strong><p>Comparar fuentes institucionales, reglamentos, bibliografía y memoria oral.</p></li><li><span>03</span><strong>Revisar</strong><p>Fechar cada ficha, señalar sus límites y corregirla cuando aparezca mejor evidencia.</p></li></ol>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
