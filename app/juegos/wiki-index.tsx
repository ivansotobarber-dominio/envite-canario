"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CanarianGame } from "./types";
import { CANARY_ISLANDS, GAME_CATEGORIES } from "./types";
import styles from "./wiki.module.css";

type SortMode = "alphabetical" | "reviewed";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim();
}

function searchableText(game: CanarianGame) {
  return normalize([
    game.name,
    ...game.aliases,
    ...game.families,
    ...game.islands,
    ...game.municipalities,
    ...game.comarcas,
    ...game.vocabulary.flatMap((entry) => [entry.term, entry.definition]),
  ].join(" "));
}

function publicStatus(game: CanarianGame) {
  if (game.publication === "inventory") return "Término pendiente de contraste";
  if (game.editorialStatus === "documentada") return `Revisada el ${game.reviewedLabel}`;
  if (game.editorialStatus === "fuentes-contradictorias") return "Fuentes contradictorias";
  if (game.editorialStatus === "revision-pendiente") return "Revisión pendiente";
  return "Fuentes parciales";
}

export function WikiIndex({ games }: { games: CanarianGame[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [island, setIsland] = useState("");
  const [sort, setSort] = useState<SortMode>("alphabetical");
  const [urlReady, setUrlReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const frame = window.requestAnimationFrame(() => {
      setQuery(params.get("q") ?? "");
      setCategory(params.get("categoria") ?? "");
      setIsland(params.get("isla") ?? "");
      setSort(params.get("orden") === "revision" ? "reviewed" : "alphabetical");
      setUrlReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!urlReady) return;
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("categoria", category);
    if (island) params.set("isla", island);
    if (sort === "reviewed") params.set("orden", "revision");
    const next = params.size ? `${window.location.pathname}?${params}` : window.location.pathname;
    window.history.replaceState(null, "", next);
  }, [category, island, query, sort, urlReady]);

  const results = useMemo(() => {
    const needle = normalize(query);
    return games
      .filter((game) => !needle || searchableText(game).includes(needle))
      .filter((game) => !category || game.category === category)
      .filter((game) => !island || game.islands.some((item) => item === island))
      .sort((a, b) => sort === "reviewed"
        ? b.reviewedAt.localeCompare(a.reviewedAt) || a.name.localeCompare(b.name, "es")
        : a.name.localeCompare(b.name, "es"));
  }, [category, games, island, query, sort]);

  const grouped = useMemo(() => results.reduce<Record<string, CanarianGame[]>>((accumulator, game) => {
    const letter = normalize(game.name).charAt(0).toLocaleUpperCase("es");
    accumulator[letter] ??= [];
    accumulator[letter].push(game);
    return accumulator;
  }, {}), [results]);

  const activeFilters = Boolean(query || category || island || sort !== "alphabetical");
  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setIsland("");
    setSort("alphabetical");
  };

  return (
    <>
      <section className={styles.explorer} aria-labelledby="explore-title">
        <div className={styles.explorerHeading}>
          <p className={styles.kicker}>Explorar el archivo</p>
          <h2 id="explore-title">Encuentra un juego por nombre, lugar o familia.</h2>
        </div>
        <div className={styles.searchField}>
          <label htmlFor="wiki-search">Buscar un juego, alias o término</label>
          <input id="wiki-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. billarda, cartas o Tenerife" autoComplete="off" />
        </div>
        <div className={styles.filters} aria-label="Filtros del inventario">
          <label><span>Categoría</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Todas</option>{GAME_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <label><span>Isla documentada</span><select value={island} onChange={(event) => setIsland(event.target.value)}><option value="">Todas</option>{CANARY_ISLANDS.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <label><span>Orden</span><select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}><option value="alphabetical">A-Z</option><option value="reviewed">Revisión reciente</option></select></label>
          {activeFilters && <button className={styles.clearButton} type="button" onClick={resetFilters}>Limpiar filtros</button>}
        </div>
      </section>

      <section className={styles.results} aria-labelledby="results-title">
        <div className={styles.resultsHeader}>
          <div><p className={styles.kicker}>Inventario de trabajo</p><h2 id="results-title">Juegos, prácticas y términos por documentar</h2></div>
          <p className={styles.resultCount} aria-live="polite" aria-atomic="true">{results.length} {results.length === 1 ? "resultado" : "resultados"}</p>
        </div>
        {results.length ? (
          <>
            <nav className={styles.alphabet} aria-label="Saltar por inicial">{Object.keys(grouped).map((letter) => <a key={letter} href={`#letra-${letter.toLocaleLowerCase("es")}`}>{letter}</a>)}</nav>
            <div className={styles.directory}>
              {Object.entries(grouped).map(([letter, letterGames]) => (
                <section className={styles.letterGroup} id={`letra-${letter.toLocaleLowerCase("es")}`} key={letter} aria-labelledby={`heading-${letter}`}>
                  <h3 id={`heading-${letter}`}>{letter}</h3>
                  <ol className={styles.gameList}>
                    {letterGames.map((game) => (
                      <li className={styles.gameRow} key={game.slug}>
                        <div className={styles.gameIdentity}><p className={styles.gameMeta}>{game.category} · {publicStatus(game)}</p><h4>{game.name}</h4>{game.publication === "published" && game.aliases.length > 0 && <p className={styles.aliases}>También: {game.aliases.join(", ")}</p>}</div>
                        <p className={styles.gameSummary}>{game.publication === "published" ? game.summary : "Nombre incorporado como pista documental. Su definición, variantes y equivalencias permanecen abiertas hasta localizar una fuente suficiente."}</p>
                        <div className={styles.gameTerritory}><span>Implantación</span><strong>{game.publication === "published" && game.islands.length ? game.islands.join(", ") : "Pendiente de fuente"}</strong></div>
                        {game.publication === "published" ? <Link className={styles.openLink} href={`/juegos/${game.slug}`} aria-label={`Abrir ficha de ${game.name}`}>Abrir ficha <span aria-hidden="true">→</span></Link> : <span className={styles.researchLabel}>Sin ficha pública</span>}
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyState} role="status"><h3>No encontramos coincidencias.</h3><p>Prueba otra palabra o elimina uno de los filtros. El inventario seguirá creciendo a medida que se contrasten nuevas fuentes.</p><button type="button" onClick={resetFilters}>Mostrar todo el inventario</button></div>
        )}
      </section>
    </>
  );
}
