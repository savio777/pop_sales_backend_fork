import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository";
import { GetFormByIdUseCase } from "@/usecase/form/getFormByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class GetFormByIdController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const getFormByIdRequestParams = z.object({
      formId: z.string().uuid(),
    }) 
    const { formId } = getFormByIdRequestParams.parse(req.params)

    const formRepository = new PrismaFormRepository()
    const getFormByIdUseCase = new GetFormByIdUseCase(formRepository)


    const form = await getFormByIdUseCase.execute(formId)

    return res.status(200).send(form)
  }
}