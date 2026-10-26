"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "../lib/site";
import styles from "./portal-cinematografico.module.css";
import type { PortalScene } from "./portal-scene";

const destinations = [
  { name: "Envite Canario", href: "/webapp/", note: "La mesa", position: styles.envite },
  { name: "Lucha Canaria", href: "/betas/lucha-canaria/encuentro.html", note: "El terrero", position: styles.lucha },
  { name: "Bola Canaria", href: "/betas/bola-canaria/", note: "La cancha", position: styles.bola },
];

export function PortalCinematografico() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<PortalScene | null>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      pausedRef.current = media.matches;
      setPaused(media.matches);
      scene.current?.setPaused(media.matches);
    };
    applyPreference();
    media.addEventListener("change", applyPreference);
    const fail = () => {
      if (cancelled) return;
      setReady(false);
      root.current?.setAttribute("data-renderer", "fallback");
    };
    import("./portal-scene").then(({ createPortalScene }) => {
      if (cancelled || !canvas.current || !root.current) return;
      scene.current = createPortalScene(canvas.current, root.current, {
        desktop: assetPath("/images/portal-atlantico-v2.webp"), mobile: assetPath("/images/portal-caldera.webp"),
        paused: pausedRef.current, ready: () => { if (!cancelled) setReady(true); }, failed: fail,
      });
    }).catch(fail);
    return () => {
      cancelled = true;
      media.removeEventListener("change", applyPreference);
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  function toggleMotion() {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    scene.current?.setPaused(next);
  }

  return <main ref={root} className={styles.portal} id="contenido-principal" tabIndex={-1} data-renderer="fallback">
    <picture className={styles.backdrop}>
      <source media="(max-aspect-ratio: 4/5)" srcSet={assetPath("/images/portal-caldera.webp")} />
      {/* The picture remains visible without JavaScript, WebGL or a loaded scene. */}
      <img src={assetPath("/images/portal-atlantico-v2.webp")} alt="" fetchPriority="high" />
    </picture>
    <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
    <div className={styles.identity}>
      <p>La cultura que no se practica se pierde, la que se adapta permanece</p>
      <h1>ENVITECANARIO.ES</h1>
    </div>
    <nav className={styles.destinations} aria-label="Elige tu juego">
      {destinations.map((destination, index) => <a key={destination.href} href={assetPath(destination.href)}
        className={`${styles.destination} ${destination.position}`} data-portal={index}
        onPointerEnter={() => scene.current?.setActive(index)} onPointerLeave={() => scene.current?.setActive(-1)}
        onFocus={() => scene.current?.setActive(index)} onBlur={() => scene.current?.setActive(-1)}>
        <span className={styles.destinationNote}>{destination.note}</span>
        <span className={styles.destinationName}>{destination.name}<span aria-hidden="true"> ↗</span></span>
        <span className={styles.beta}>Beta</span>
      </a>)}
    </nav>
    <a className={styles.explore} href={assetPath("/explorar/")}>EXPLORAR LA WEB <span aria-hidden="true">↗</span></a>
    <p className={styles.caption}>Proyecto independiente <span aria-hidden="true">·</span> Escena conceptual</p>
    {ready && <button type="button" className={styles.motion} onClick={toggleMotion}
      aria-label={paused ? "Reanudar animación" : "Pausar animación"}
      title={paused ? "Reanudar animación" : "Pausar animación"} aria-pressed={paused}>
      <span aria-hidden="true" className={paused ? styles.playIcon : styles.pauseIcon} />
    </button>}
  </main>;
}
