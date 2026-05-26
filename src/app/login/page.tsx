"use client";

import { useState, Suspense } from "react";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './login.module.css';

function ResetSuccessBanner() {
  const searchParams = useSearchParams();
  if (searchParams.get("reset") !== "ok") return null;
  return (
    <div style={{ color: "green", marginBottom: "16px", textAlign: "center" }}>
      Contraseña restablecida correctamente. Ya podés iniciar sesión.
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al iniciar sesión");
      }

      router.push("/");
      router.refresh(); // Refresh the layout to update the Header
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <Suspense fallback={null}>
          <ResetSuccessBanner />
        </Suspense>
        {error && <div style={{ color: "red", marginBottom: "16px", textAlign: "center" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>Usuario</label>
            <input
              type="text"
              id="username"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <div className={styles.footer} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link href="/forgot-password" className={styles.link}>¿Olvidaste tu contraseña?</Link>
          <span>¿No tienes cuenta? <Link href="/register" className={styles.link}>Regístrate aquí</Link></span>
        </div>
      </div>
    </div>
  );
}
