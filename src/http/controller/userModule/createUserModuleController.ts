import { PrismaModuleRepository } from "@/repository/prisma/prismaModuleRepository";
import { PrismaUserModuleRepository } from "@/repository/prisma/prismaUserModuleRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { CreateUserModuleUseCase } from "@/usecase/userModule/createUserModuleUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateUserModuleController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const createUserModuleRequestBody = z.object({
      userId: z.string().uuid(),
      moduleId: z.string().uuid()
    })
    const data = createUserModuleRequestBody.parse(req.body)

    const userRepository = new PrismaUserRepository()
    const moduleRepository = new PrismaModuleRepository()
    const userModuleRepository = new PrismaUserModuleRepository()

    const createUserModuleUseCase = new CreateUserModuleUseCase(
      userModuleRepository,
      userRepository,
      moduleRepository,
    )

    const userModule = await createUserModuleUseCase.execute(data)
    return res.status(200).send(userModule)
  }
}