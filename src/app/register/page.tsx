// src/app/register/page.tsx
import Link from 'next/link';
import styles from './register.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Registro de Paciente</h1>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nombre Completo</label>
            <input type="text" id="name" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="dni" className={styles.label}>DNI</label>
            <input type="text" id="dni" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
            <input type="email" id="email" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input type="password" id="password" className={styles.input} required />
          </div>
          <button type="submit" className={styles.submit}>Crear Cuenta</button>
        </form>
        <div className={styles.footer}>
          ¿Ya tienes cuenta? <Link href="/login" className={styles.link}>Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}