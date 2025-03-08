import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaModuleRepository } from "@/repository/prisma/prismaModuleRepository";
import { ListModuleUseCase } from "@/usecase/module/listModuleUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListModuleController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const listModulesRequestParams = z.object({
      companyId: z.string().uuid()
    })

    const listModuleRequestQuery = z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(200),
    })

    const {limit, page} = listModuleRequestQuery.parse(req.query)
    const {companyId} = listModulesRequestParams.parse(req.params)

    const moduleRepository = new PrismaModuleRepository()
    const companyRepository = new PrismaCompanyRepository()

    const listModuleUseCase = new ListModuleUseCase(
      moduleRepository,
      companyRepository
    )

    const modules = await listModuleUseCase.execute({
      companyId, limit, page
    })
    
    return res.status(200).send(modules)
  }
}