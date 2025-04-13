import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository";
import { GetFormResponseByIdUseCase } from "@/usecase/form/getFormResponseByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class GetFormResponseBtIdController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const getFormResponseByIdRequestParams = z.object({
      formResponseId: z.string().uuid(),
    })
    const { formResponseId } = getFormResponseByIdRequestParams.parse(req.params)

    const formRepository = new PrismaFormRepository()
    const getFormResponseByIdUseCase = new GetFormResponseByIdUseCase(formRepository)

    const formResponse = await getFormResponseByIdUseCase.execute(formResponseId)

    return res.status(200).send(formResponse)
  }
}