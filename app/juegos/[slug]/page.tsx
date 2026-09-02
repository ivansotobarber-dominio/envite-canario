import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../site-chrome";
import { getGameBySlug, getRelatedGames, publishedGames } from "../data";
import type { CanarianGame, SourcedText } from "../types";
import styles from "../wiki.module.css";

type GamePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedGames.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  const titleParts = [game.name];
  if (game.howToPlay || game.rules.length) titleParts.push("cómo se juega");
  if (game.history.length) titleParts.push("historia");
  titleParts.push("fuentes");
  return {
    title: titleParts.join(", "),
    description: game.summary,
    alternates: { canonical: `/juegos/${game.slug}` },
    openGraph: { type: "article", url: `/juegos/${game.slug}`, title: game.name, description: game.summary, modifiedTime: game.reviewedAt },
  };
}

function sourceNumbers(game: CanarianGame, ids: string[]) {
  return ids.map((id) => game.sources.findIndex((item) => item.id === id) + 1).filter((number) => number > 0);
}

function Citation({ game, ids }: { game: CanarianGame; ids: string[] }) {
  const numbers = sourceNumbers(game, ids);
  if (!numbers.length) return null;
  return <sup className={styles.citation} aria-label={`Fuentes ${numbers.join(", ")}`}>[{numbers.join(", ")}]</sup>;
}

function Paragraphs({ game, items }: { game: CanarianGame; items: SourcedText[] }) {
  return items.map((item) => <p key={item.text}>{item.text}<Citation game={game} ids={item.sourceIds} /></p>);
}

function List({ game, items }: { game: CanarianGame; items: SourcedText[] }) {
  return <ul className={styles.ruleList}>{items.map((item) => <li key={item.text}>{item.text}<Citation game={game} ids={item.sourceIds} /></li>)}</ul>;
}

function statusLabel(game: CanarianGame) {
  if (game.editorialStatus === "documentada") return "Ficha documentada";
  if (game.editorialStatus === "fuentes-contradictorias") return "Fuentes contradictorias";
  if (game.editorialStatus === "revision-pendiente") return "Revisión pendiente";
  return "Fuentes parciales";
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();
  const related = getRelatedGames(game);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: game.name,
    description: game.summary,
    inLanguage: "es",
    dateModified: game.reviewedAt,
    mainEntityOfPage: `https://envitecanario.es/juegos/${game.slug}/`,
    about: { "@type": "DefinedTerm", name: game.name, alternateName: game.aliases, description: game.summary },
    citation: game.sources.map((item) => item.url),
    publisher: { "@type": "Organization", name: "Proyecto Envite Canario", url: "https://envitecanario.es/" },
  };
  const hasRules = Boolean(game.howToPlay || game.objective || game.preparation.length || game.rules.length || game.scoring.length || game.ending);
  const hasContext = Boolean(game.history.length || game.implantation.length || game.variants.length || game.currentSituation.length);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className={styles.entryPage}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/">Inicio</Link><span aria-hidden="true">/</span><Link href="/juegos">Wiki</Link><span aria-hidden="true">/</span><span aria-current="page">{game.name}</span></nav>
        <header className={styles.entryHeader}>
          <div className={styles.entryTitle}><p className={styles.kicker}>{game.category}</p><h1>{game.name}</h1>{game.aliases.length > 0 && <p className={styles.entryAliases}>También se conoce como {game.aliases.join(", ")}.</p>}<p className={styles.entryLead}>{game.summary}<Citation game={game} ids={game.sources.map((item) => item.id)} /></p>{game.playableHref && <Link className={styles.playLink} href={game.playableHref}>Jugar en la WebApp <span aria-hidden="true">→</span></Link>}</div>
          <div className={styles.revisionStamp}><span>{statusLabel(game)}</span><strong>Revisada el {game.reviewedLabel}</strong><p>La ausencia de un dato indica que todavía no existe evidencia suficiente para publicarlo.</p></div>
        </header>
        <dl className={styles.quickFacts}>
          <div><dt>Categoría</dt><dd>{game.category}</dd></div>
          {game.playerCount && <div><dt>Participantes</dt><dd>{game.playerCount}<Citation game={game} ids={game.sources.map((item) => item.id)} /></dd></div>}
          <div><dt>Islas documentadas</dt><dd>{game.islands.length ? game.islands.join(", ") : "Pendiente de documentar"}{game.islands.length > 0 && <Citation game={game} ids={game.sources.map((item) => item.id)} />}</dd></div>
          {game.materials.length > 0 && <div><dt>Material</dt><dd>{game.materials.map((item) => <span key={item.text}>{item.text}<Citation game={game} ids={item.sourceIds} /> </span>)}</dd></div>}
        </dl>
        <div className={styles.entryLayout}>
          <aside className={styles.entryToc} aria-label="En esta ficha"><strong>En esta ficha</strong>{hasRules && <a href="#como-se-juega">Cómo se juega</a>}{hasContext && <a href="#contexto">Contexto y territorio</a>}{game.vocabulary.length > 0 && <a href="#vocabulario">Vocabulario</a>}<a href="#fuentes">Fuentes</a></aside>
          <article className={styles.entryArticle}>
            {hasRules && <section id="como-se-juega" aria-labelledby="como-title"><p className={styles.sectionNumber}>01</p><h2 id="como-title">Cómo se juega</h2>{game.howToPlay && <p className={styles.primaryExplanation}>{game.howToPlay.text}<Citation game={game} ids={game.howToPlay.sourceIds} /></p>}{game.objective && <div className={styles.subsection}><h3>Objetivo</h3><p>{game.objective.text}<Citation game={game} ids={game.objective.sourceIds} /></p></div>}{game.preparation.length > 0 && <div className={styles.subsection}><h3>Preparación</h3><List game={game} items={game.preparation} /></div>}{game.rules.length > 0 && <div className={styles.subsection}><h3>Reglas documentadas</h3><List game={game} items={game.rules} /></div>}{game.scoring.length > 0 && <div className={styles.subsection}><h3>Puntuación</h3><List game={game} items={game.scoring} /></div>}{game.ending && <div className={styles.subsection}><h3>Final de la partida</h3><p>{game.ending.text}<Citation game={game} ids={game.ending.sourceIds} /></p></div>}</section>}
            {hasContext && <section id="contexto" aria-labelledby="context-title"><p className={styles.sectionNumber}>02</p><h2 id="context-title">Contexto, territorio y variantes</h2>{game.history.length > 0 && <div className={styles.subsection}><h3>Historia</h3><Paragraphs game={game} items={game.history} /></div>}{game.implantation.length > 0 && <div className={styles.subsection}><h3>Implantación documentada</h3><Paragraphs game={game} items={game.implantation} /></div>}{game.variants.length > 0 && <div className={styles.subsection}><h3>Variantes</h3>{game.variants.map((variant) => <div className={styles.variant} key={variant.name}><h4>{variant.name}{variant.territory ? ` · ${variant.territory}` : ""}</h4><p>{variant.description}<Citation game={game} ids={variant.sourceIds} /></p></div>)}</div>}{game.currentSituation.length > 0 && <div className={styles.subsection}><h3>Situación actual</h3><Paragraphs game={game} items={game.currentSituation} /></div>}</section>}
            {game.vocabulary.length > 0 && <section id="vocabulario" aria-labelledby="vocabulary-title"><p className={styles.sectionNumber}>03</p><h2 id="vocabulary-title">Vocabulario propio</h2><dl className={styles.vocabulary}>{game.vocabulary.map((entry) => <div key={entry.term}><dt>{entry.term}</dt><dd>{entry.definition}<Citation game={game} ids={entry.sourceIds} /></dd></div>)}</dl></section>}
            <section id="fuentes" aria-labelledby="sources-title"><p className={styles.sectionNumber}>{game.vocabulary.length ? "04" : "03"}</p><h2 id="sources-title">Fuentes y límites</h2><p>Las referencias sostienen solo los apartados en los que aparecen citadas. Una fuente general no convierte en universal una variante local.</p><ol className={styles.sourcesList}>{game.sources.map((item) => <li key={item.id}><a href={item.url} target="_blank" rel="noreferrer">{item.title}</a><span>{item.organization} · {item.type}</span>{item.note && <p>{item.note}</p>}</li>)}</ol></section>
          </article>
        </div>
        {related.length > 0 && <section className={styles.related} aria-labelledby="related-title"><p className={styles.kicker}>Seguir explorando</p><h2 id="related-title">Juegos relacionados</h2><div>{related.map((item) => item.publication === "published" ? <Link href={`/juegos/${item.slug}`} key={item.slug}>{item.name}<span>{item.category}</span></Link> : <span key={item.slug}>{item.name}<small>Ficha en investigación</small></span>)}</div></section>}
      </main>
      <SiteFooter />
    </>
  );
}
