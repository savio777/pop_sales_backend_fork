import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository";
import { DeleteFormUseCase } from "@/usecase/form/deleteFormUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class DeleteFormController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const deleteFormRequestParams = z.object({
      formId: z.string().uuid(),
    }) 

    const { formId } = deleteFormRequestParams.parse(req.params)

    const formRepository = new PrismaFormRepository()
    const deleteFormUseCase = new DeleteFormUseCase(formRepository)

    await deleteFormUseCase.execute(formId)

    return res.status(200).send()
  }
}