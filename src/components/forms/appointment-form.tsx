"use client";

import { useState } from "react";
import { DOCUMENT_TYPES } from "@/lib/validation/appointment-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";

export function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      documentType: (form.elements.namedItem("documentType") as HTMLSelectElement).value,
      documentNumber: (form.elements.namedItem("documentNumber") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/solicitar-turno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al enviar la solicitud");

      setStatus("success");
      setMessage("Su solicitud fue recibida. Se le asignará un turno.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Error al enviar la solicitud. Intente nuevamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">Nombre</label>
      <Input id="firstName" name="firstName" required minLength={2} maxLength={100} />

      <label htmlFor="lastName">Apellido</label>
      <Input id="lastName" name="lastName" required minLength={2} maxLength={100} />

      <label htmlFor="documentType">Tipo de documento</label>
      <select id="documentType" name="documentType" defaultValue="DNI" required>
        {DOCUMENT_TYPES.map((documentType) => (
          <option key={documentType} value={documentType}>
            {documentType}
          </option>
        ))}
      </select>

      <label htmlFor="documentNumber">Número de documento</label>
      <Input id="documentNumber" name="documentNumber" required inputMode="numeric" pattern="\d{7,10}" />

      <label htmlFor="email">Email</label>
      <Input id="email" name="email" type="email" required />

      <label htmlFor="phone">Teléfono</label>
      <Input id="phone" name="phone" type="tel" required minLength={8} maxLength={30} />

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar solicitud"}
      </Button>

      {status !== "idle" && <StatusMessage type={status === "loading" ? "info" : status} message={message} />}
    </form>
  );
}