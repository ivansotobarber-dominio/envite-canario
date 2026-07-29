import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Información sobre privacidad y tratamiento de datos en la web de prelanzamiento de Envite Canario.",
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
          <h1>Una web sin captación de datos.</h1>
          <p className="legal-lead">
            Esta versión de prelanzamiento es informativa. No incluye cuentas,
            formularios, newsletter, pagos, publicidad ni analítica de terceros.
          </p>

          <section>
            <h2>Qué datos solicitamos</h2>
            <p>
              Ninguno. La web no pide nombre, correo, teléfono, ubicación ni datos
              de juego. Tampoco instala herramientas publicitarias o de seguimiento.
            </p>
          </section>

          <section>
            <h2>Alojamiento y registros técnicos</h2>
            <p>
              El proveedor de alojamiento puede procesar registros técnicos mínimos,
              como dirección IP, fecha, navegador y recurso solicitado, para operar,
              proteger y diagnosticar el servicio.
            </p>
          </section>

          <section>
            <h2>Enlaces a redes sociales</h2>
            <p>
              Cuando se activen los perfiles oficiales, los enlaces dirigirán a
              plataformas externas con sus propias condiciones y políticas de
              privacidad. Esta web no incrustará sus píxeles ni widgets en la fase inicial.
            </p>
          </section>

          <section>
            <h2>Cambios futuros</h2>
            <p>
              Antes de activar formularios, analítica, tienda, cuentas o beta pública,
              esta información se ampliará con el responsable, las finalidades, la base
              jurídica, los proveedores y los canales para ejercer derechos.
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
