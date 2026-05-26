"use client";

import styles from "./rejection-modal.module.css";

interface RejectionModalProps {
  onClose: () => void;
}

export function RejectionModal({ onClose }: RejectionModalProps) {
  return (
    <div className={styles.backdrop} role="alertdialog" aria-modal="true" aria-labelledby="rejection-title" aria-describedby="rejection-desc">
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h2 id="rejection-title" className={styles.title}>No es posible continuar con la solicitud</h2>

        <div id="rejection-desc">
          <p className={styles.message}>
            Lamentablemente, su solicitud de turno no puede ser procesada en este momento. Para recibir la vacuna contra la fiebre hemorrágica argentina, es imprescindible cumplir con ambos requisitos:
          </p>
          <ul className={styles.list}>
            <li>Tener entre <strong>15 y 60 años</strong> de edad.</li>
            <li>No haber recibido <strong>ninguna vacuna en los últimos 30 días</strong>.</li>
          </ul>
          <div className={styles.advice}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Le recomendamos consultar con su médico para obtener una orientación personalizada sobre su situación particular.</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.closeButton} type="button" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
