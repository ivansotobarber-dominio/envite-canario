"use client";

import Link from "next/link";
import { useState } from "react";

type Island = {
  slug: string;
  name: string;
  theme: string;
  description: string;
  href: string;
};

const islands: Island[] = [
  { slug: "tenerife", name: "Tenerife", theme: "Historia", description: "Origenes, memoria y voces de la mesa canaria.", href: "/historia" },
  { slug: "gran-canaria", name: "Gran Canaria", theme: "Tienda", description: "Baraja, tapete y objetos para llevar el Envite a casa.", href: "/tienda" },
  { slug: "lanzarote", name: "Lanzarote", theme: "Torneos", description: "Calendario popular, convocatorias y resultados verificables.", href: "/torneos" },
  { slug: "fuerteventura", name: "Fuerteventura", theme: "Normas", description: "Base comun, variantes y decisiones de cada modalidad.", href: "/normas-y-variantes" },
  { slug: "la-palma", name: "La Palma", theme: "Fuentes", description: "Referencias, documentos y trazabilidad editorial.", href: "/fuentes" },
  { slug: "la-gomera", name: "La Gomera", theme: "Comunidad", description: "Jugadores, asociaciones y mesas que mantienen viva la costumbre.", href: "/comunidad" },
  { slug: "el-hierro", name: "El Hierro", theme: "Noticias", description: "Actualidad del proyecto, beta y nuevas mesas.", href: "/noticias" },
  { slug: "la-graciosa", name: "La Graciosa", theme: "Glosario", description: "Palabras, senas y expresiones para entender la mesa.", href: "/glosario" },
];

export function IslandPortal() {
  const [activeSlug, setActiveSlug] = useState("tenerife");
  const active = islands.find((island) => island.slug === activeSlug) ?? islands[0];

  return (
    <section className="island-portal" id="archipielago" aria-labelledby="island-portal-title">
      <div className="section-inner island-portal-inner">
        <div className="section-heading island-heading">
          <p className="eyebrow">Un archipielago, muchas mesas</p>
          <h2 id="island-portal-title">Entra por la isla que te llame.</h2>
          <p>
            Cada isla abre una parte del proyecto. Es un mapa editorial, no un mapa de reglas: sirve para descubrir, aprender y volver a la mesa.
          </p>
        </div>
        <div className="island-explorer">
          <div className="island-map" aria-label="Mapa interactivo de las ocho islas de Envite Canario">
            <div className="island-map-grid" aria-hidden="true" />
            {islands.map((island, index) => (
              <button
                className={`island-node island-node-${island.slug} ${active.slug === island.slug ? "island-node-active" : ""}`}
                key={island.slug}
                type="button"
                onClick={() => setActiveSlug(island.slug)}
                aria-pressed={active.slug === island.slug}
              >
                <span className="island-number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{island.name}</strong>
              </button>
            ))}
            <span className="island-map-caption">Ocho islas, una mesa</span>
          </div>
          <div className="island-detail" aria-live="polite">
            <p className="eyebrow">{active.name}</p>
            <span className="island-detail-index">Puerta {String(islands.indexOf(active) + 1).padStart(2, "0")}</span>
            <h3>{active.theme}</h3>
            <p>{active.description}</p>
            <Link className="button button-primary" href={active.href}>
              Abrir {active.theme.toLowerCase()}
            </Link>
            <div className="island-detail-rule" aria-hidden="true" />
            <small>Contenido en beta, revisado antes de publicarse como referencia.</small>
          </div>
        </div>
      </div>
    </section>
  );
}
