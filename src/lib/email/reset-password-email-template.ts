export function buildResetPasswordEmail(input: { resetUrl: string }): { subject: string; html: string } {
  return {
    subject: "Restablecer contraseña",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #2c7a7b;">Restablecer contraseña</h2>
        <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
        <p>Hacé clic en el siguiente botón para crear una nueva contraseña. El enlace expira en <strong>1 hora</strong>.</p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${input.resetUrl}"
             style="background-color: #2c7a7b; color: white; padding: 12px 24px; border-radius: 6px;
                    text-decoration: none; font-weight: bold; display: inline-block;">
            Restablecer contraseña
          </a>
        </div>
        <p style="color: #666; font-size: 0.9rem;">
          Si no solicitaste este cambio, podés ignorar este correo. Tu contraseña no será modificada.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 0.8rem;">
          Si el botón no funciona, copiá y pegá este enlace en tu navegador:<br />
          <a href="${input.resetUrl}" style="color: #2c7a7b;">${input.resetUrl}</a>
        </p>
      </div>
    `,
  };
}
