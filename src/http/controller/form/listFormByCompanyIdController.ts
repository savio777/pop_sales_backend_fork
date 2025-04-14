import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository";
import { ListFormByCompanyIdUseCase } from "@/usecase/form/listFormByCompanyIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListFormByCompanyIdController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const listFormByCompanyIdRequestParams = z.object({
      companyId: z.string() 
    })
    const { companyId } = listFormByCompanyIdRequestParams.parse(req.params)
    const formRepository = new PrismaFormRepository()
    const companyRepository = new PrismaCompanyRepository()
    const listFormByCompanyIdUseCase = new ListFormByCompanyIdUseCase(
      formRepository,
      companyRepository
    )

    const forms = await listFormByCompanyIdUseCase.execute(companyId)
    return res.status(200).send(forms)
  }
}