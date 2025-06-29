import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { PasswordRecoverySendEmailUseCase } from "@/usecase/auth/passwordRecoverySendEmailUseCase";
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod";

export class PasswordRecoverySendEmailController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const requestBody = z.object({
      email: z.string().email(),
      linkChangePassword: z.string().url(),
    });

    const { email, linkChangePassword } = requestBody.parse(req.body);

    const prismaUserRepository = new PrismaUserRepository();
    const passwordRecoverySendEmailController = new PasswordRecoverySendEmailUseCase(prismaUserRepository);

    const message = await passwordRecoverySendEmailController.execute({
      email, linkChangePassword
    });

    return res.status(200).send({ message });
  }
}