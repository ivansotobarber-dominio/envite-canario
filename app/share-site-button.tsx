"use client";

import { useState } from "react";

export function ShareSiteButton() {
  const [label, setLabel] = useState("Compartir el proyecto");

  async function share() {
    const data = {
      title: "Envite Canario",
      text: "Jugar, aprender y conservar el Envite Canario.",
      url: "https://envitecanario.es/",
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }

      await navigator.clipboard.writeText(data.url);
      setLabel("Enlace copiado");
      window.setTimeout(() => setLabel("Compartir el proyecto"), 2500);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setLabel("No se pudo compartir");
      window.setTimeout(() => setLabel("Compartir el proyecto"), 2500);
    }
  }

  return (
    <button className="footer-share" type="button" onClick={share}>
      {label}
    </button>
  );
}
