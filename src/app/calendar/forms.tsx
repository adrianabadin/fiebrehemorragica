"use client";

import { useState } from "react";
import styles from "./calendar.module.css";

export function RuleForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    // Convert types
    const payload = {
      validFrom: body.validFrom,
      dayOfWeek: Number(body.dayOfWeek),
      startTime: body.startTime,
      endTime: body.endTime,
      slotCount: Number(body.slotCount),
    };

    try {
      const res = await fetch("/api/admin/schedule-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("Regla creada correctamente.");
        form.reset();
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.error || res.statusText}`);
      }
    } catch (err) {
      setStatus(`Error: ${(err as Error).message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Vigente desde:
        <input type="date" name="validFrom" required />
      </label>
      <label>
        Dia de la semana:
        <select name="dayOfWeek" required>
          <option value="1">Lunes</option>
          <option value="2">Martes</option>
          <option value="3">Miercoles</option>
          <option value="4">Jueves</option>
          <option value="5">Viernes</option>
        </select>
      </label>
      <label>
        Hora inicio:
        <input type="time" name="startTime" defaultValue="09:00" required />
      </label>
      <label>
        Hora fin:
        <input type="time" name="endTime" defaultValue="14:00" required />
      </label>
      <label>
        Cantidad de turnos:
        <input type="number" name="slotCount" defaultValue={20} min={1} required />
      </label>
      <button type="submit" className={styles.button}>Crear Regla</button>
      {status && <p className={styles.status}>{status}</p>}
    </form>
  );
}

export function CancelDayForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/admin/calendar/day", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus("Dia cancelado y turnos reprogramados.");
        form.reset();
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.error || res.statusText}`);
      }
    } catch (err) {
      setStatus(`Error: ${(err as Error).message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Fecha a cancelar:
        <input type="date" name="date" required />
      </label>
      <button type="submit" className={styles.dangerButton}>Cancelar Dia y Reprogramar</button>
      {status && <p className={styles.status}>{status}</p>}
    </form>
  );
}
