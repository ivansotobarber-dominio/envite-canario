import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Información del proyecto",
  description:
    "Estado, propiedad, catálogo y condiciones actuales de la web y la WebApp de Envite Canario.",
  alternates: {
    canonical: "/informacion-legal",
  },
};

export default function LegalInformationPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className="legal-page">
        <div className="legal-inner">
          <p className="eyebrow">Información del proyecto</p>
          <h1>Envite Canario está en desarrollo público.</h1>
          <p className="legal-lead">
            Esta web presenta un proyecto independiente. No es una federación,
            no representa un reglamento oficial único y todavía no opera una
            tienda transaccional.
          </p>

          <section>
            <h2>Identificación del titular</h2>
            <p><strong>Titular:</strong> Iván Soto Barber.</p>
            <p><strong>Denominación del proyecto:</strong> Envite Canario.</p>
            <p><strong>NIF:</strong> pendiente.</p>
            <p><strong>Domicilio:</strong> pendiente.</p>
            <p>
              <strong>Correo de contacto:</strong>{" "}
              <a href="mailto:envido@envitecanario.es">envido@envitecanario.es</a>.
            </p>
          </section>

          <section>
            <h2>Finalidad</h2>
            <p>
              Facilitar el acceso a la WebApp, publicar el catálogo en
              preparación, reunir torneos verificados y documentar normas,
              variantes, noticias e historia del Envite Canario.
            </p>
          </section>

          <section>
            <h2>WebApp en beta</h2>
            <p>
              La WebApp es una versión de prueba. El motor, la interfaz y las
              reglas pueden cambiar. No debe utilizarse como árbitro definitivo
              de una partida o de un torneo.
            </p>
          </section>

          <section>
            <h2>Reglas, señas y variantes</h2>
            <p>
              El Envite mantiene variantes por isla, municipio, modalidad y
              costumbre de mesa. Los contenidos diferencian base contrastada,
              variante identificada, memoria oral y elementos pendientes de validar.
            </p>
          </section>

          <section>
            <h2>Catálogo no transaccional</h2>
            <p>
              La sección Tienda muestra conceptos de producto en desarrollo. No
              ofrece precios, stock, reservas, preventas, carrito, pagos ni fechas
              de entrega. Las imágenes conceptuales no equivalen al producto final.
            </p>
          </section>

          <section>
            <h2>Torneos y clasificación</h2>
            <p>
              Las convocatorias se publican con fuente y fecha de verificación.
              La clasificación no mostrará puntos o participantes hasta disponer
              de un reglamento y resultados trazables.
            </p>
          </section>

          <section>
            <h2>Propiedad intelectual</h2>
            <p>
              La marca, el diseño, los textos, el software y los materiales propios
              de Envite Canario no pueden reutilizarse comercialmente sin autorización.
              Las reglas tradicionales y las referencias culturales no se presentan
              como propiedad exclusiva del proyecto.
            </p>
          </section>

          <Link className="text-link" href="/">
            Volver al inicio
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
