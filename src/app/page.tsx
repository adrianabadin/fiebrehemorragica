import { Card } from "@/components/ui/card";
import { AppointmentForm } from "@/components/forms/appointment-form";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main>
      <Card>
        <h1>Solicitar Turno</h1>
        <p>Complete el formulario para solicitar un turno de vacunación.</p>
        <AppointmentForm />
      </Card>
    </main>
  );
}