import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import styles from "./calendar.module.css";
import { RuleForm, CancelDayForm } from "./forms";

export default async function CalendarPage() {
  const user = await getSession();

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  const rules = await prisma.scheduleRule.findMany({
    orderBy: { validFrom: "desc" },
    take: 5,
  });

  const exceptions = await prisma.calendarException.findMany({
    orderBy: { date: "desc" },
    take: 20,
  });

  const daysOfWeek = ["", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Gestion de Calendario</h1>

      <section className={styles.section}>
        <h2>Reglas de Agenda Activas</h2>
        {rules.length === 0 ? (
          <p className={styles.empty}>No hay reglas configuradas. Se usa el default (Viernes 08:30 - 11:50, 20 turnos).</p>
        ) : (
          <ul className={styles.list}>
            {rules.map((rule) => (
              <li key={rule.id} className={styles.ruleCard}>
                <strong>Vigente desde:</strong> {rule.validFrom.toLocaleDateString("es-AR")}<br />
                <strong>Dia:</strong> {daysOfWeek[rule.dayOfWeek]}<br />
                <strong>Horario:</strong> {rule.startTime} - {rule.endTime}<br />
                <strong>Turnos:</strong> {rule.slotCount}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.section}>
        <h2>Crear Nueva Regla</h2>
        <RuleForm />
      </section>

      <section className={styles.section}>
        <h2>Cancelar Dia</h2>
        <CancelDayForm />
      </section>

      <section className={styles.section}>
        <h2>Excepciones Recientes</h2>
        {exceptions.length === 0 ? (
          <p className={styles.empty}>No hay excepciones registradas.</p>
        ) : (
          <ul className={styles.list}>
            {exceptions.map((ex) => (
              <li key={ex.id} className={styles.exceptionCard}>
                <strong>Fecha:</strong> {ex.date.toLocaleDateString("es-AR")}<br />
                <strong>Tipo:</strong> {ex.type}<br />
                <strong>Motivo:</strong> {ex.label}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
