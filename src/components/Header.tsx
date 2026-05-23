// src/components/Header.tsx
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  // Mock user state. Cambiar a null para probar estado deslogueado.
  const user = { name: "Juana" }; 

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        SaludPública
      </Link>
      
      <nav className={styles.nav}>
        <Link href="/calendar" className={styles.link}>
          Calendario
        </Link>
        {user ? (
          <div className={styles.user}>Hola, {user.name}</div>
        ) : (
          <Link href="/login" className={styles.cta}>
            Iniciar Sesión
          </Link>
        )}
      </nav>
    </header>
  );
}
