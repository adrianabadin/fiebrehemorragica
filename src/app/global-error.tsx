"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body>
        <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
          <h2>Algo salió mal</h2>
          <p>{error.message || "Error inesperado del servidor."}</p>
          <button
            onClick={reset}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.5rem",
              cursor: "pointer",
              borderRadius: "6px",
              border: "none",
              background: "#0070f3",
              color: "white",
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
