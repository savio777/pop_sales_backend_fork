import { PrismaUserModuleRepository } from "@/repository/prisma/prismaUserModuleRepository";
import { ListUseModuleUseCase } from "@/usecase/userModule/listUserModuleUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListUserModuleController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const listUserModuleRequestParams = z.object({
      userId: z.string().uuid()
    })

    const listUserModuleRequestQuery = z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(200),
    })

    const {userId} = listUserModuleRequestParams.parse(req.params)
    const {limit, page} = listUserModuleRequestQuery.parse(req.query)

    const userModuleRepository = new PrismaUserModuleRepository()

    const createUserModuleUseCase = new ListUseModuleUseCase(
      userModuleRepository
    )

    const userModules = await createUserModuleUseCase.execute({
      userId, limit, page
    })
    
    return res.status(200).send(userModules)
  }
}