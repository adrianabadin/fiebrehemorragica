"use client";

import { useState } from "react";
import styles from "./calendar.module.css";

interface Rule {
  id: string;
  validFrom: string | Date;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotCount: number;
}

interface RuleListProps {
  rules: Rule[];
  daysOfWeek: string[];
}

function formatDateForInput(dateValue: string | Date): string {
  const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;
  return date.toISOString().split("T")[0];
}

export function RuleList({ rules, daysOfWeek }: RuleListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [ruleList, setRuleList] = useState(rules);

  async function handleDelete(id: string) {
    if (!confirm("Seguro que queres borrar esta regla? Los turnos a futuro se van a reprogramar segun la regla anterior o el default.")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/schedule-rules?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setRuleList((prev) => prev.filter((r) => r.id !== id));
        setStatus("Regla eliminada.");
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.error || res.statusText}`);
      }
    } catch (err) {
      setStatus(`Error: ${(err as Error).message}`);
    }
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    const payload = {
      validFrom: body.validFrom,
      dayOfWeek: Number(body.dayOfWeek),
      startTime: body.startTime,
      endTime: body.endTime,
      slotCount: Number(body.slotCount),
    };

    try {
      const res = await fetch(`/api/admin/schedule-rules?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const updated = await res.json();
        setRuleList((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  validFrom: updated.validFrom,
                  dayOfWeek: updated.dayOfWeek,
                  startTime: updated.startTime,
                  endTime: updated.endTime,
                  slotCount: updated.slotCount,
                }
              : r
          )
        );
        setEditingId(null);
        setStatus("Regla actualizada correctamente.");
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.error || res.statusText}`);
      }
    } catch (err) {
      setStatus(`Error: ${(err as Error).message}`);
    }
  }

  if (ruleList.length === 0) {
    return (
      <p className={styles.empty}>
        No hay reglas configuradas. Se usa el default (Viernes 08:30 - 11:50, 20 turnos).
      </p>
    );
  }

  return (
    <>
      {status && <p className={styles.status}>{status}</p>}
      <ul className={styles.list}>
        {ruleList.map((rule) => (
          <li key={rule.id} className={styles.ruleCard}>
            {editingId === rule.id ? (
              <form
                onSubmit={(e) => handleUpdate(e, rule.id)}
                className={styles.form}
                style={{ marginTop: 0 }}
              >
                <label>
                  Vigente desde:
                  <input
                    type="date"
                    name="validFrom"
                    defaultValue={formatDateForInput(rule.validFrom)}
                    required
                  />
                </label>
                <label>
                  Dia de la semana:
                  <select name="dayOfWeek" defaultValue={rule.dayOfWeek} required>
                    <option value="1">Lunes</option>
                    <option value="2">Martes</option>
                    <option value="3">Miercoles</option>
                    <option value="4">Jueves</option>
                    <option value="5">Viernes</option>
                  </select>
                </label>
                <label>
                  Hora inicio:
                  <input
                    type="time"
                    name="startTime"
                    defaultValue={rule.startTime}
                    required
                  />
                </label>
                <label>
                  Hora fin:
                  <input
                    type="time"
                    name="endTime"
                    defaultValue={rule.endTime}
                    required
                  />
                </label>
                <label>
                  Cantidad de turnos:
                  <input
                    type="number"
                    name="slotCount"
                    defaultValue={rule.slotCount}
                    min={1}
                    required
                  />
                </label>
                <div className={styles.buttonGroup}>
                  <button type="submit" className={styles.button}>
                    Guardar
                  </button>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => setEditingId(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <strong>Vigente desde:</strong>{" "}
                {(typeof rule.validFrom === "string" ? new Date(rule.validFrom) : rule.validFrom).toLocaleDateString("es-AR")}
                <br />
                <strong>Dia:</strong> {daysOfWeek[rule.dayOfWeek]}
                <br />
                <strong>Horario:</strong> {rule.startTime} - {rule.endTime}
                <br />
                <strong>Turnos:</strong> {rule.slotCount}
                <div className={styles.buttonGroup}>
                  <button
                    className={styles.button}
                    onClick={() => setEditingId(rule.id)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.dangerButton}
                    onClick={() => handleDelete(rule.id)}
                  >
                    Borrar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
