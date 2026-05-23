// src/components/Header.tsx
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  // TODO: Replace with real auth hook (e.g. useSession or JWT parsing)
  const user = null; 

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Región Sanitaria X
      </Link>
      
      <nav className={styles.nav}>
        {user?.role === 'admin' && (
          <Link href="/calendar" className={styles.link}>
            Calendario
          </Link>
        )}
        {user ? (
          <div className={styles.userContainer}>
            <span className={styles.userName}>{user.name}</span>
            <button className={styles.logoutBtn}>Cerrar Sesión</button>
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link href="/login" className={styles.link}>Sign In</Link>
            <Link href="/register" className={styles.cta}>Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
