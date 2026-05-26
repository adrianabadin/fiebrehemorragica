"use client";

import { useState } from "react";
import styles from "./eligibility-modal.module.css";

type Answer = "si" | "no" | null;

interface EligibilityModalProps {
  onEligible: () => void;
  onIneligible: () => void;
  onCancel: () => void;
}

export function EligibilityModal({ onEligible, onIneligible, onCancel }: EligibilityModalProps) {
  const [ageAnswer, setAgeAnswer] = useState<Answer>(null);
  const [vaccineAnswer, setVaccineAnswer] = useState<Answer>(null);

  const canConfirm = ageAnswer !== null && vaccineAnswer !== null;

  function handleConfirm() {
    if (ageAnswer === "si" && vaccineAnswer === "si") {
      onEligible();
    } else {
      onIneligible();
    }
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="eligibility-title">
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        </div>

        <h2 id="eligibility-title" className={styles.title}>Verificación de elegibilidad</h2>
        <p className={styles.subtitle}>
          Para continuar con su solicitud de turno, le solicitamos confirmar que cumple con los siguientes requisitos sanitarios:
        </p>

        <div className={styles.questions}>
          <div className={styles.questionBlock}>
            <p className={styles.questionText}>
              1. ¿Tiene usted entre 15 y 60 años de edad?
            </p>
            <div className={styles.radioGroup}>
              <label className={`${styles.radioLabel} ${ageAnswer === "si" ? styles.selectedYes : ""} ${ageAnswer === "no" ? styles.unselected : ""}`}>
                <input type="radio" name="age" value="si" onChange={() => setAgeAnswer("si")} checked={ageAnswer === "si"} />
                Sí
              </label>
              <label className={`${styles.radioLabel} ${ageAnswer === "no" ? styles.selectedNo : ""} ${ageAnswer === "si" ? styles.unselected : ""}`}>
                <input type="radio" name="age" value="no" onChange={() => setAgeAnswer("no")} checked={ageAnswer === "no"} />
                No
              </label>
            </div>
          </div>

          <div className={styles.questionBlock}>
            <p className={styles.questionText}>
              2. ¿Declara usted no haber recibido ninguna vacuna en los últimos 30 días?
            </p>
            <div className={styles.radioGroup}>
              <label className={`${styles.radioLabel} ${vaccineAnswer === "si" ? styles.selectedYes : ""} ${vaccineAnswer === "no" ? styles.unselected : ""}`}>
                <input type="radio" name="vaccine" value="si" onChange={() => setVaccineAnswer("si")} checked={vaccineAnswer === "si"} />
                Sí
              </label>
              <label className={`${styles.radioLabel} ${vaccineAnswer === "no" ? styles.selectedNo : ""} ${vaccineAnswer === "si" ? styles.unselected : ""}`}>
                <input type="radio" name="vaccine" value="no" onChange={() => setVaccineAnswer("no")} checked={vaccineAnswer === "no"} />
                No
              </label>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelButton} type="button" onClick={onCancel}>
            Volver al formulario
          </button>
          <button
            className={styles.confirmButton}
            type="button"
            disabled={!canConfirm}
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
