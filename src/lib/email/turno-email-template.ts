export function buildTurnoEmail(input: {
  name: string;
  scheduledDate: string;
  scheduledTime: string;
}) {
  return {
    subject: "Se le ha asignado un turno para vacunacion de fiebre hemorragica",
    html: `
      <p>Hola ${input.name},</p>
      <p>Se le ha asignado un turno para vacunacion de fiebre hemorragica.</p>
      <p>Fecha: ${input.scheduledDate}</p>
      <p>Hora: ${input.scheduledTime}</p>
      <p>Direccion: Hijas de San Jose 145</p>
      <p>Sede: Region Sanitaria X</p>
    `,
  };
}