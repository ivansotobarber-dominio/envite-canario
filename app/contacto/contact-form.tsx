"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { mountContactForm } from "../../lib/contact-form.mjs";
import styles from "./contact-form.module.css";

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (form.current) return mountContactForm(form.current);
  }, []);
  return (
    <form ref={form} className={styles.form} data-contact-form onSubmit={(event) => event.preventDefault()}>
      <fieldset disabled>
        <legend>Consulta al proyecto</legend>
        <label>Nombre<input name="nombre" required maxLength={120} autoComplete="name" /></label>
        <label>Correo<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
        <label>Consulta<textarea name="mensaje" required maxLength={4000} rows={5} /></label>
        <input name="_gotcha" type="text" hidden tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <label className={styles.consent}><input name="privacidad" type="checkbox" required value="leida" />He leído la información de privacidad.</label>
        <button type="submit" className="button button-primary">Enviar consulta</button>
      </fieldset>
      <p>Responsable: Iván Soto Barber. Finalidad: atender su consulta, por interés legítimo o medidas precontractuales según la solicitud. Proveedores: Formspree y correo, con tratamiento en Estados Unidos. Puede ejercer sus derechos en envido@envitecanario.es. <Link className="text-link" href="/privacidad">Información de privacidad</Link></p>
      <p data-contact-status role="status" aria-live="polite" aria-atomic="true">El envío desde la web no está disponible. Puede escribir al correo de contacto.</p>
      <noscript>Para contactar sin JavaScript, utilice el enlace de correo.</noscript>
    </form>
  );
}
