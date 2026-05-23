import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Turnos - Vacunación Fiebre Hemorrágica",
  description: "Solicite un turno para vacunación de fiebre hemorrágica",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
