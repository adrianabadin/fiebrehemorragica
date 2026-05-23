import { Card } from "@/components/ui/card";
import { AppointmentForm } from "@/components/forms/appointment-form";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Solicitar Turno</h1>
        <p className={styles.description}>Complete el formulario para solicitar un turno de vacunación.</p>
        <AppointmentForm />
      </Card>
    </main>
  );
}
