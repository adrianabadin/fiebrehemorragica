// src/components/Header.tsx
import Link from 'next/link';
import styles from './Header.module.css';
import { getSession } from '@/lib/auth/session';

export default async function Header() {
  const user = await getSession();

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
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className={styles.logoutBtn}>Cerrar Sesión</button>
            </form>
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
