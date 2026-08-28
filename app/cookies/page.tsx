import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Información sobre cookies y tecnologías similares en Envite Canario.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className="legal-page">
        <div className="legal-inner">
          <p className="eyebrow">Privacidad</p>
          <h1>Cookies y tecnologías similares.</h1>
          <p className="legal-lead">
            Envite Canario no utiliza actualmente cookies de análisis,
            publicidad o seguimiento.
          </p>

          <section>
            <h2>Responsable</h2>
            <p><strong>Responsable:</strong> Iván Soto Barber, titular del proyecto Envite Canario.</p>
            <p><strong>NIF:</strong> pendiente.</p>
            <p><strong>Domicilio:</strong> pendiente.</p>
            <p><strong>Contacto:</strong> <a href="mailto:envido@envitecanario.es">envido@envitecanario.es</a>.</p>
          </section>

          <section>
            <h2>Estado actual</h2>
            <p>
              La comprobación técnica realizada el 28 de agosto de 2026 no
              detectó cookies, almacenamiento local, almacenamiento de sesión,
              iframes ni service workers en la web pública.
            </p>
          </section>

          <section>
            <h2>Por qué no aparece un banner</h2>
            <p>
              No se muestra un banner porque actualmente no se instalan
              tecnologías no necesarias que requieran consentimiento.
            </p>
          </section>

          <section>
            <h2>Cambios futuros</h2>
            <p>
              Antes de activar analítica, publicidad, contenidos embebidos,
              formularios conectados u otras tecnologías no estrictamente
              necesarias, se actualizará esta información y se solicitará
              consentimiento cuando corresponda.
            </p>
          </section>

          <Link className="text-link" href="/">Volver al inicio</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
