import { env } from "@/env";
import { EmailService } from "@/service/email/sendEmail";

export class PasswordRecoverySendEmail {
  async execute(email: string, linkChangePassword: string) {
    const emailService = new EmailService();

    const code = []

    for (let i = 0; i < 4; i++) {
      const n = Math.floor(Math.random() * 10);
      code.push(n);
    }

    //salvar no banco redis com ttl de 20min
    

    const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
  <h2>Recuperação de Senha</h2>
  <p>Você solicitou a recuperação de sua senha.</p>
  <p>Utilize o código de verificação abaixo para redefinir sua senha:</p>
  <div style="font-size: 32px; font-weight: bold; margin: 16px 0; color: #4A90E2;">
    ${code}
  </div>
  <p>Depois de copiar o código, clique no botão abaixo para continuar:</p>
  <a href="${linkChangePassword}" target="_blank" style="
    display: inline-block;
    padding: 12px 24px;
    background-color: #4A90E2;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
  ">Redefinir Senha</a>
  <p style="margin-top: 20px; font-size: 12px; color: #999;">
    Se você não solicitou essa recuperação, ignore este e-mail.
  </p>
</div>
`;

    emailService.sendEmail({
      from: env.GMAIL_HOST,
      to: email,
      subject: "Assunto do e-mail",
      html: html,
    });

    return {
      message: "Email enviado com sucesso",
    };
  }
}
