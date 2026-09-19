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
      <main id="contenido-principal" tabIndex={-1} className="legal-page">
        <div className="legal-inner">
          <p className="eyebrow">Privacidad</p>
          <h1>Privacidad y consultas al proyecto.</h1>
          <p className="legal-lead">
            El formulario de contacto tramita consultas mediante
            Formspree. Esta versión no incluye cuentas, newsletter,
            pagos, publicidad ni analítica de terceros.
          </p>
          <p>Información actualizada el 19 de septiembre de 2026.</p>

          <section>
            <h2>Responsable</h2>
            <p><strong>Responsable:</strong> Iván Soto Barber, titular del proyecto Envite Canario.</p>
            <p><strong>NIF:</strong> pendiente.</p>
            <p><strong>Domicilio:</strong> pendiente.</p>
            <p>
              Para consultas sobre privacidad o ejercicio de derechos puede escribir a{" "}
              <a href="mailto:envido@envitecanario.es">envido@envitecanario.es</a>.
            </p>
          </section>

          <section>
            <h2>Qué datos solicitamos</h2>
            <p>
              El formulario solicita nombre, correo electrónico y mensaje,
              además de la confirmación de lectura de esta información. Los campos
              marcados como obligatorios permiten identificar y atender la consulta;
              sin ellos no podrá enviarse. No incluya datos de salud, otros datos
              sensibles, contraseñas, datos bancarios ni documentos confidenciales
              o datos de terceras personas que no sean necesarios.
            </p>
          </section>

          <section>
            <h2>Finalidad y base jurídica</h2>
            <p>
              Las consultas recibidas por correo y por el
              formulario se utilizarán para responder y gestionar su solicitud.
              Para consultas generales, la base es el interés legítimo en atender
              comunicaciones iniciadas por la persona interesada (artículo 6.1.f
              del RGPD), limitado a esa finalidad y con derecho de oposición.
              Cuando solicite medidas previas a un contrato del que sería parte,
              se aplicará el artículo 6.1.b del RGPD.
            </p>
            <p>
              Leer esta política no equivale a consentir publicidad. No se utilizarán
              las consultas para newsletters, campañas comerciales ni elaboración
              de perfiles, ni para decisiones automatizadas con efectos jurídicos.
            </p>
          </section>

          <section>
            <h2>Destinatarios y transferencias</h2>
            <p>
              El circuito utiliza Formspree, Inc. para recibir, almacenar
              y remitir el mensaje al buzón envido@envitecanario.es. Tendrán acceso
              el responsable y los proveedores técnicos de formulario y correo
              necesarios para atenderlo, así como las autoridades cuando exista
              una obligación legal. No se venderán los datos ni se cederán para
              publicidad del proyecto.
            </p>
            <p>
              Formspree puede tratar datos técnicos como IP, navegador y fecha de
              acceso, y utiliza infraestructura en Estados Unidos. El proveedor
              declara basarse en cláusulas contractuales tipo para transferencias
              como encargado. Su aplicación a esta cuenta y el acuerdo de tratamiento
              siguen pendientes de verificación. La activación del formulario no
              acredita esa revisión contractual.
              Puede solicitar información sobre las garantías al correo del responsable.
            </p>
            <p>
              Consulte la <a href="https://formspree.io/legal/privacy-policy/">política de Formspree</a>{" "}
              y su <a href="https://formspree.io/security/">información de seguridad y transferencias</a>.
            </p>
          </section>

          <section>
            <h2>Conservación y archivo</h2>
            <p>
              Formspree tiene activado el archivo de envíos. Su plan gratuito
              incluye 30 días de historial, lo que no acredita el borrado de
              todas las copias ni de los mensajes recibidos por correo.
              No hay un procedimiento propio de borrado automático implantado.
            </p>
            <p>
              El criterio de conservación es mantener la consulta durante su gestión y,
              después, solo lo necesario para obligaciones legales o posibles
              responsabilidades durante sus plazos aplicables, con acceso
              restringido y bloqueo cuando corresponda. El responsable realizará
              una revisión manual mensual de consultas
              cerradas, tanto en el archivo como en el buzón, para suprimir las
              que ya no deban conservarse. No es una rutina automática actualmente
              implantada. Si se inicia una relación
              contractual, se informará del tratamiento correspondiente.
            </p>
          </section>

          <section>
            <h2>Sus derechos</h2>
            <p>
              Puede solicitar acceso, rectificación, supresión, limitación,
              oposición y, cuando corresponda, portabilidad escribiendo a{" "}
              <a href="mailto:envido@envitecanario.es">envido@envitecanario.es</a>.
              Indique el derecho y la consulta afectada; solo se solicitará
              información adicional de identidad si resulta necesaria. Si algún
              tratamiento se basara en consentimiento, podrá retirarlo sin afectar
              a la licitud del tratamiento anterior. También puede reclamar ante la{" "}
              <a href="https://www.aepd.es/">Agencia Española de Protección de Datos</a>.
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
              Antes de activar analítica, compras, cuentas o juego
              online, esta información se ampliará con las finalidades, la base
              jurídica, los proveedores, los plazos de conservación y los derechos
              que correspondan a cada tratamiento.
            </p>
          </section>

          <p><Link href="/cookies">Cookies y tecnologías similares</Link></p>

          <Link className="text-link" href="/">
            Volver al inicio
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
