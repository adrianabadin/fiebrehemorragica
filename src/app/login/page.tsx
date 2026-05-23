// src/app/login/page.tsx
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
            <input type="email" id="email" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input type="password" id="password" className={styles.input} required />
          </div>
          <button type="submit" className={styles.submit}>Ingresar</button>
        </form>
        <div className={styles.footer}>
          ¿No tienes cuenta? <Link href="/register" className={styles.link}>Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
}
