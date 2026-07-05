"use client";

import { useState } from "react";
import { track } from "@/lib/track";

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm({ sourcePath = "/asesoria/" }: { sourcePath?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, sourcePath })
      });

      if (!response.ok) throw new Error("No se pudo guardar");
      track("lead_submit", { source: sourcePath });
      setStatus("success");
      setMessage("Listo. Recibimos tus datos para orientarte mejor por WhatsApp.");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("No pudimos guardar el formulario. Escríbenos por WhatsApp y te atendemos.");
    }
  }

  return (
    <form className="card card-pad lead-form" onSubmit={onSubmit}>
      <h3>Diagnostico rapido</h3>
      <p>Deja los datos clave para recomendarte formato, receta y volumen de compra.</p>
      <label>
        Nombre
        <input name="name" required minLength={2} autoComplete="name" />
      </label>
      <label>
        WhatsApp
        <input name="phone" required minLength={7} autoComplete="tel" />
      </label>
      <label>
        Ciudad
        <input name="city" autoComplete="address-level2" />
      </label>
      <label>
        Tipo de negocio
        <select name="businessType" defaultValue="">
          <option value="" disabled>
            Selecciona una opcion
          </option>
          <option>Bar o restaurante</option>
          <option>Frutera</option>
          <option>Heladeria</option>
          <option>Emprendimiento de bebidas</option>
          <option>Evento o catering</option>
          <option>Consumo personal</option>
        </select>
      </label>
      <label>
        Que quieres preparar?
        <textarea name="need" required minLength={8} rows={4} />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Recibir asesoria"}
      </button>
      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}
