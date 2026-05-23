export function buildRescheduleEmail(input: {
  fullName: string;
  oldDate: string;
  newDate: string;
  newTime: string;
}) {
  return {
    subject: "Su turno ha sido reprogramado",
    html: `
      <p>Hola ${input.fullName},</p>
      <p>Le informamos que su turno ha sido reprogramado.</p>
      <p><strong>Fecha anterior:</strong> ${input.oldDate}</p>
      <p><strong>Nueva fecha:</strong> ${input.newDate}</p>
      <p><strong>Nueva hora:</strong> ${input.newTime}</p>
      <p>Direccion: Hijas de San Jose 145</p>
      <p>Sede: Region Sanitaria X</p>
    `,
  };
}
