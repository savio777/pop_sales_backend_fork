import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { ChangePasswordUseCase } from "@/usecase/auth/changePasswordUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ChangePasswordController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const requestBody = z.object({
      code: z.array(z.number()),
      password: z.string(),
      confirmPassword: z.string(),
      email: z.string().email(),
    });

    const data = requestBody.parse(req.body);

    const prismaUserRepository = new PrismaUserRepository();
    const changePasswordUseCase = new ChangePasswordUseCase(
      prismaUserRepository
    );

    const message = await changePasswordUseCase.execute(data);

    return res.status(200).send({ message });
  }
}
