import Link from "next/link";
import { assetPath } from "../lib/site";

const disciplines = [
  { name: "Envite Canario", status: "Activo", copy: "La primera mesa digital del proyecto.", href: "/app", tone: "juegos-card-active" },
  { name: "Lucha Canaria", status: "Incubacion", copy: "Investigacion, memoria y futura experiencia interactiva.", href: "#juegos-canarios", tone: "juegos-card-ocean" },
  { name: "Bola Canaria", status: "Investigacion", copy: "Territorio, tecnica y cultura de plaza.", href: "#juegos-canarios", tone: "juegos-card-sand" },
  { name: "Salto del Pastor", status: "Investigacion", copy: "Practica, seguridad y conocimiento del paisaje.", href: "#juegos-canarios", tone: "juegos-card-red" },
  { name: "Juego del Palo", status: "Investigacion", copy: "Garrote canario, fundamentos, modalidades y transmision viva.", href: "#juegos-canarios", tone: "juegos-card-ink" },
];

export function JuegosCanariosBand() {
  return (
    <section className="juegos-canarios-band" id="juegos-canarios" aria-labelledby="juegos-canarios-title">
      <div className="section-inner">
        <div className="juegos-canarios-heading">
          <div>
            <p className="eyebrow">Proyecto matriz</p>
            <h2 id="juegos-canarios-title">Juegos Canarios.</h2>
          </div>
          <p>
            Una plataforma para investigar, jugar y conservar cinco practicas canarias. Envite abre la mesa; las demas lineas creceran con fuentes, voces y experiencias propias.
          </p>
        </div>
        <div className="juegos-canarios-feature">
          <video
            aria-hidden="true"
            autoPlay
            className="juegos-canarios-feature-video"
            loop
            muted
            playsInline
            poster={assetPath("/images/juegos-canarios-retro-telar-reference-v04.png")}
            preload="metadata"
          >
            <source src={assetPath("/videos/juegos-canarios-retro-telar-loop-v01.mp4")} type="video/mp4" />
          </video>
          {/* Static local fallback avoids a runtime image-optimizer dependency on the public site. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Panorama ilustrado de juegos tradicionales canarios con borde de telar"
            className="juegos-canarios-feature-image"
            src={assetPath("/images/juegos-canarios-retro-telar-reference-v04.png")}
          />
          <div>
            <p className="eyebrow">Archivo jugable</p>
            <h3>La cultura que no se practica se pierde. La que se adapta, permanece.</h3>
            <p>Envite es la primera puerta. La nueva ventana ordena las cinco lineas, su estado y el compromiso de documentarlas antes de convertirlas en experiencias digitales.</p>
            <Link className="button button-dark" href="/juegos-canarios">Abrir Juegos Canarios</Link>
          </div>
        </div>
        <div className="juegos-canarios-grid">
          {disciplines.map((discipline) => (
            <Link className={`juegos-canarios-card ${discipline.tone}`} href={discipline.href} key={discipline.name}>
              <span>{discipline.status}</span>
              <h3>{discipline.name}</h3>
              <p>{discipline.copy}</p>
              <strong aria-hidden="true">Abrir</strong>
            </Link>
          ))}
        </div>
        <div className="juegos-canarios-footnote">
          <span>Una marca matriz, cinco lineas culturales.</span>
          <span>Contenido publicado solo con fuentes y atribucion.</span>
        </div>
      </div>
    </section>
  );
}
