"use client";

import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al registrar");
      }

      setSuccess("Cuenta creada correctamente. Redirigiendo...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear Cuenta</h1>
        {error && <div style={{ color: "red", marginBottom: "16px", textAlign: "center" }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: "16px", textAlign: "center" }}>{success}</div>}
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
              minLength={8}
              required 
            />
          </div>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Creando..." : "Crear Cuenta"}
          </button>
        </form>
        <div className={styles.footer}>
          ¿Ya tienes cuenta? <Link href="/login" className={styles.link}>Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
