"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../login/login.module.css";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al restablecer la contraseña");
      }

      router.push("/login?reset=ok");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Nueva contraseña</h1>
        {error && (
          <div style={{ color: "red", marginBottom: "16px", textAlign: "center" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Nueva contraseña</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              minLength={8}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirm" className={styles.label}>Confirmar contraseña</label>
            <input
              type="password"
              id="confirm"
              className={styles.input}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Guardando..." : "Guardar nueva contraseña"}
          </button>
        </form>
        <div className={styles.footer}>
          <Link href="/login" className={styles.link}>Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  );
}
