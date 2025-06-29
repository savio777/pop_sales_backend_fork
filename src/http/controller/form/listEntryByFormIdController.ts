import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository"
import { ListEntryByFormIdUseCase } from "@/usecase/form/listEntryByFormIdUseCase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export class ListEntryByFormIdController {

  async handle(req: FastifyRequest, res: FastifyReply){
    const listEntryByFormIdRequestParams = z.object({
      formId: z.string()
    })
    const { formId } = listEntryByFormIdRequestParams.parse(req.params)

    const formRepository = new PrismaFormRepository() 

    const listFormByCompanyIdUseCase = new ListEntryByFormIdUseCase(
      formRepository,
    )

    const entries = await listFormByCompanyIdUseCase.execute(formId)
    return res.status(200).send(entries)
  }
}