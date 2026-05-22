interface StatusMessageProps {
  type: "success" | "error" | "info";
  message: string;
}

export function StatusMessage({ type, message }: StatusMessageProps) {
  return (
    <div data-type={type} style={{
      padding: "12px 16px",
      borderRadius: "var(--radius-md)",
      background: type === "success" ? "var(--success)" : type === "error" ? "var(--accent)" : "var(--primary)",
      color: "#fff",
    }}>
      {message}
    </div>
  );
}