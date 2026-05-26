"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../login/login.module.css";

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al procesar la solicitud");
      }

      setMessage(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Olvidé mi contraseña</h1>
        {message && (
          <div style={{ color: "green", marginBottom: "16px", textAlign: "center" }}>
            {message}
          </div>
        )}
        {error && (
          <div style={{ color: "red", marginBottom: "16px", textAlign: "center" }}>
            {error}
          </div>
        )}
        {!message && (
          <form onSubmit={handleSubmit}>
            <p style={{ marginTop: 0, marginBottom: "20px", color: "var(--text-main)" }}>
              Ingresá tu email y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>Email</label>
              <input
                type="email"
                id="username"
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>
        )}
        <div className={styles.footer}>
          <Link href="/login" className={styles.link}>Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  );
}
