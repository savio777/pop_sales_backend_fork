import { PrismaModuleRepository } from "@/repository/prisma/prismaModuleRepository";
import { PrismaUserModuleRepository } from "@/repository/prisma/prismaUserModuleRepository";
import { ListModuleUseCase } from "@/usecase/module/listModuleUseCase";
import { ListUseModuleUseCase } from "@/usecase/userModule/listUserModuleUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListModuleController {
  async handle(req: FastifyRequest, res: FastifyReply){

    const listUserModuleRequestQuery = z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(200),
    })

    const {limit, page} = listUserModuleRequestQuery.parse(req.query)

    const moduleRepository = new PrismaModuleRepository()

    const listModuleUseCase = new ListModuleUseCase(
      moduleRepository
    )

    const userModules = await createUserModuleUseCase.execute({
      userId, limit, page
    })
    
    return res.status(200).send(userModules)
  }
}