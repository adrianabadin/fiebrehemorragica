"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      reason: (form.elements.namedItem("reason") as HTMLTextAreaElement).value,
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
      <label htmlFor="name">Nombre</label>
      <Input id="name" name="name" required minLength={2} maxLength={100} />

      <label htmlFor="email">Email</label>
      <Input id="email" name="email" type="email" required />

      <label htmlFor="phone">Teléfono</label>
      <Input id="phone" name="phone" type="tel" required minLength={8} maxLength={30} />

      <label htmlFor="reason">Motivo</label>
      <Textarea id="reason" name="reason" required minLength={5} maxLength={500} />

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar solicitud"}
      </Button>

      {status !== "idle" && <StatusMessage type={status === "loading" ? "info" : status} message={message} />}
    </form>
  );
}