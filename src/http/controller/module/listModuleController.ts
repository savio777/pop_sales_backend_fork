import { PrismaModuleRepository } from "@/repository/prisma/prismaModuleRepository";
import { ListModuleUseCase } from "@/usecase/module/listModuleUseCase";
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

    const modules = await listModuleUseCase.execute({
      limit, page
    })
    
    return res.status(200).send(modules)
  }
}