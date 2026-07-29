import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Información del proyecto",
  description:
    "Información de uso, propiedad y estado de la web de prelanzamiento de Envite Canario.",
  alternates: {
    canonical: "/informacion-legal",
  },
};

export default function LegalInformationPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <div className="legal-inner">
          <p className="eyebrow">Información del proyecto</p>
          <h1>Envite Canario está en prelanzamiento.</h1>
          <p className="legal-lead">
            Esta web presenta un proyecto independiente en desarrollo. No es una
            federación, una fuente oficial de reglas ni una tienda activa.
          </p>

          <section>
            <h2>Finalidad</h2>
            <p>
              Dar a conocer el desarrollo de la app, su enfoque cultural, la hoja de
              ruta de comunidad y torneos, y la futura línea de productos físicos.
            </p>
          </section>

          <section>
            <h2>Reglas, señas y variantes</h2>
            <p>
              El Envite mantiene variantes por isla, municipio y costumbre de mesa.
              Los contenidos se publicarán diferenciando la base contrastada, las
              variantes identificadas y los elementos todavía pendientes de validar.
            </p>
          </section>

          <section>
            <h2>Propiedad intelectual</h2>
            <p>
              La marca, el diseño, los textos, el software y los materiales propios de
              Envite Canario no pueden reutilizarse comercialmente sin autorización.
              Las referencias culturales y las reglas tradicionales no se presentan
              como una apropiación exclusiva del proyecto.
            </p>
          </section>

          <section>
            <h2>Servicios todavía no activos</h2>
            <p>
              No hay compras, suscripciones, publicidad, premios, inscripciones a
              torneos ni acceso público a la beta en esta versión.
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
