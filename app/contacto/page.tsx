import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto directo con el proyecto Envite Canario para juego, cultura, torneos, tienda y colaboraciones.",
  alternates: {
    canonical: "/contacto",
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className="legal-page">
        <div className="legal-inner">
          <p className="eyebrow">Contacto</p>
          <h1>Hablemos de Envite.</h1>
          <p className="legal-lead">
            Para torneos, testimonios, reglas, tienda, prensa o colaboraciones,
            escriba directamente al correo del proyecto.
          </p>

          <section>
            <h2>Correo del proyecto</h2>
            <p>
              <a className="text-link" href="mailto:envido@envitecanario.es">
                envido@envitecanario.es
              </a>
            </p>
            <p>
              El enlace abre su aplicación de correo; no envía ningún mensaje automáticamente.
            </p>
          </section>

          <ContactForm />

          <section>
            <h2>Para ayudarnos a responder</h2>
            <p>
              Indique en el asunto si se trata de un torneo, una corrección de
              reglas, una entrevista, una propuesta comercial o una consulta
              sobre la tienda.
            </p>
          </section>

          <Link className="text-link" href="/redes-sociales">
            Consultar el estado de las redes sociales
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
