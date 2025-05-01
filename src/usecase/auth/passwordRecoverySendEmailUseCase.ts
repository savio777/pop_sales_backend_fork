import { env } from "@/env";
import { NotFoundError } from "@/error/notfound.error";
import { SendEmailError } from "@/error/sendEmail.error";
import { cache } from "@/lib/redis";
import { UserRepository } from "@/repository/userRepository";
import { EmailService } from "@/service/email/sendEmail";

export class PasswordRecoverySendEmailUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ){}

  async execute(
    {email, linkChangePassword}:
    {email: string, linkChangePassword: string}
  ) {
    const user = await this.userRepository.getByEmail(email);
    if(!user){
      throw new NotFoundError("Usuário não encontrado com este email")
    }
    const emailService = new EmailService();

    const code = [];

    for (let i = 0; i < 4; i++) {
      const n = Math.floor(Math.random() * 10);
      code.push(n);
    }

    const payload = {
      email,
      code,
    };

    const ttl = 60 * 20; //20 minutos
    const key = "recovery:password:code:" + email;
    await cache.set(key, payload, ttl);

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Recuperação de Senha</h2>
      <p>Você solicitou a recuperação de sua senha.</p>
      <p>Utilize o código de verificação abaixo para redefinir sua senha:</p>
      <div style="font-size: 32px; font-weight: bold; margin: 16px 0; color: #4A90E2;">
        ${code[0]}  ${code[1]}  ${code[2]}  ${code[3]}
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
      <p style="margin-top: 20px; font-size: 14px; color: #333;">
        Lembre-se, você tem 20 minutos para clicar no link e alterar sua senha antes que ele expire.
      </p>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        Se você não solicitou essa recuperação, ignore este e-mail.
      </p>
    </div>
    `;

    try {
      await emailService.sendEmail({
        from: env.GMAIL_HOST,
        to: email,
        subject: "Assunto do e-mail",
        html: html,
      });

      return {
        message: "Email enviado com sucesso",
      };
    } catch (error) {
      throw new SendEmailError(`${error}`);
    }
  }
}
