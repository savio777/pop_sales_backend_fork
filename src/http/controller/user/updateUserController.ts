import { PrismaUserCompanyRepository } from "@/repository/prisma/prismaUserCompanyRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { UpdateUserUseCase } from "@/usecase/user/updateUserUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class UpdateUserController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const userRequestParams = z.object({
      userId: z.string().uuid(),
    });

    const userRequestBody = z.object({
      name: z.string().trim().optional(),
      phone: z
        .string()
        .min(8, { message: "Número de telefone inválido" })
        .optional(),
      email: z.string().email({ message: "E-mail inválido" }).optional(),
      status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
      companyId: z.string().uuid().optional(),
    });

    const { userId } = userRequestParams.parse(req.params);
    const data = userRequestBody.parse(req.body);

    const userRepository = new PrismaUserRepository();
    const userCompanyRepository = new PrismaUserCompanyRepository();
    const updateUserUseCase = new UpdateUserUseCase(
      userRepository,
      userCompanyRepository
    );

    const user = await updateUserUseCase.execute({
      userId,
      data,
    });

    return res.status(200).send(user);
  }
}
