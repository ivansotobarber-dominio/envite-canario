import Link from "next/link";

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