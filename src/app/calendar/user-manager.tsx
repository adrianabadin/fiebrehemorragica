"use client";

import { useState, useEffect } from "react";
import styles from "./calendar.module.css";

interface User {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}

export function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        setStatus("Error al cargar usuarios.");
      }
    } catch (err) {
      setStatus(`Error: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function toggleRole(userId: string, currentRole: string) {
    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        setStatus(`Rol cambiado a ${newRole}.`);
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.error || res.statusText}`);
      }
    } catch (err) {
      setStatus(`Error: ${(err as Error).message}`);
    }
  }

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <>
      {status && <p className={styles.status}>{status}</p>}
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.id} className={styles.userCard}>
            <div className={styles.userInfo}>
              <strong>{user.username}</strong>
              <span className={user.role === "admin" ? styles.adminBadge : styles.userBadge}>
                {user.role}
              </span>
            </div>
            <button
              className={user.role === "admin" ? styles.secondaryButton : styles.button}
              onClick={() => toggleRole(user.id, user.role)}
            >
              {user.role === "admin" ? "Quitar admin" : "Hacer admin"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
