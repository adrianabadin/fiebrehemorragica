"use client";

import { useRef, useState } from "react";
import { DOCUMENT_TYPES } from "@/lib/validation/appointment-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";
import { EligibilityModal } from "@/components/ui/eligibility-modal";
import { RejectionModal } from "@/components/ui/rejection-modal";

type ModalState = "none" | "eligibility" | "rejection";

export function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState<ModalState>("none");
  const pendingFormRef = useRef<HTMLFormElement | null>(null);

  function handleSubmitAttempt(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    pendingFormRef.current = e.currentTarget;
    setModal("eligibility");
  }

  async function submitForm(form: HTMLFormElement) {
    setStatus("loading");
    setMessage("");

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

  function handleEligible() {
    const form = pendingFormRef.current;
    pendingFormRef.current = null;
    setModal("none");
    if (form) submitForm(form);
  }

  function handleIneligible() {
    pendingFormRef.current?.reset();
    pendingFormRef.current = null;
    setModal("rejection");
  }

  function handleEligibilityCancel() {
    pendingFormRef.current = null;
    setModal("none");
  }

  function handleRejectionClose() {
    setModal("none");
  }

  return (
    <>
      <form onSubmit={handleSubmitAttempt}>
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

      {modal === "eligibility" && (
        <EligibilityModal
          onEligible={handleEligible}
          onIneligible={handleIneligible}
          onCancel={handleEligibilityCancel}
        />
      )}

      {modal === "rejection" && (
        <RejectionModal onClose={handleRejectionClose} />
      )}
    </>
  );
}
