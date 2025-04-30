import { env } from "@/env";
import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

export class EmailService {
  private transporter: Transporter;

  constructor() {
    if (!env.GMAIL_HOST || !env.GMAIL_PASSWORD) {
      throw new Error("Variáveis de ambiente GMAIL_HOST ou GMAIL_PASSWORD não definidas.");
    }

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.GMAIL_HOST,
        pass: env.GMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(mailOptions: SendMailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("E-mail enviado:", info.response);
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      throw error;
    }
  }
}

// Exemplo de uso:
// const emailService = new EmailService();

// emailService.sendEmail({
//   from: env.GMAIL_HOST,
//   to: "destinatario@gmail.com",
//   subject: "Assunto do e-mail",
//   text: "Conteúdo do e-mail aqui",
// });
