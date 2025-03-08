import { PrismaModuleRepository } from "@/repository/prisma/prismaModuleRepository";
import { PrismaUserModuleRepository } from "@/repository/prisma/prismaUserModuleRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { RemoveUserModuleUseCase } from "@/usecase/userModule/removeUserModuleUseCase copy";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class RemoveUserModuleController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const removeUserModuleRequestBody = z.object({
      userId: z.string().uuid(),
      moduleId: z.string().uuid()
    })
    const data = removeUserModuleRequestBody.parse(req.params)

    const userRepository = new PrismaUserRepository()
    const moduleRepository = new PrismaModuleRepository()
    const userModuleRepository = new PrismaUserModuleRepository()

    const removeUserModuleUseCase = new RemoveUserModuleUseCase(
      userModuleRepository,
      userRepository,
      moduleRepository,
    )

    await removeUserModuleUseCase.execute(data)
    return res.status(200).send()
  }
}