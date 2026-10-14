import Link from "next/link";

export function ContactForm() {
  return (
    <section>
      <h2>Contacto temporal por correo</h2>
      <p>Los formularios web están temporalmente desactivados. Para consultas, escriba a <a href="mailto:envido@envitecanario.es">envido@envitecanario.es</a>.</p>
      <p>No incluya datos sensibles ni documentos confidenciales. <Link href="/privacidad">Información de privacidad</Link>.</p>
    </section>
  );
}
