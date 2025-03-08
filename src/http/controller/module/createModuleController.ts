import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaModuleRepository } from "@/repository/prisma/prismaModuleRepository";
import { CreateModuleUseCase } from "@/usecase/module/createModuleUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateModuleController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const createModulesRequestbody = z.object({
      companyId: z.string().uuid(),
      name: z.string()
    })

    const {name, companyId} = createModulesRequestbody.parse(req.body)

    const moduleRepository = new PrismaModuleRepository()
    const companyRepository = new PrismaCompanyRepository()

    const listModuleUseCase = new CreateModuleUseCase(
      moduleRepository,
      companyRepository
    )

    const module = await listModuleUseCase.execute({
      companyId, name
    })
    
    return res.status(200).send(module)
  }
}