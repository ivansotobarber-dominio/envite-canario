import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Privacidad y tratamiento de datos en la web y la WebApp beta de Envite Canario.",
  alternates: {
    canonical: "/privacidad",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <div className="legal-inner">
          <p className="eyebrow">Privacidad</p>
          <h1>Web pública sin captación de datos personales.</h1>
          <p className="legal-lead">
            Esta versión no incluye cuentas, formularios, newsletter, pagos,
            publicidad ni analítica de terceros.
          </p>

          <section>
            <h2>Qué datos solicitamos</h2>
            <p>
              Ninguno. La web no pide nombre, correo, teléfono, ubicación,
              contactos ni datos de pago.
            </p>
          </section>

          <section>
            <h2>Datos locales de la WebApp</h2>
            <p>
              La beta puede guardar en el propio navegador preferencias, estado
              de prueba o recursos necesarios para funcionar. Estos datos locales
              pueden eliminarse desde los ajustes del navegador o al borrar los
              datos del sitio. No se usan para crear un perfil personal.
            </p>
          </section>

          <section>
            <h2>Alojamiento y registros técnicos</h2>
            <p>
              El proveedor de alojamiento puede procesar registros técnicos
              mínimos, como dirección IP, fecha, navegador y recurso solicitado,
              para operar, proteger y diagnosticar el servicio.
            </p>
          </section>

          <section>
            <h2>Enlaces externos</h2>
            <p>
              Los enlaces a fuentes, redes sociales y futuras tiendas de apps
              dirigen a plataformas externas con sus propias condiciones y
              políticas de privacidad.
            </p>
          </section>

          <section>
            <h2>Cambios futuros</h2>
            <p>
              Antes de activar formularios, analítica, compras, cuentas o juego
              online, esta información se ampliará con responsable, finalidades,
              base jurídica, proveedores, conservación y ejercicio de derechos.
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