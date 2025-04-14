import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository";
import { GetFormResponseByIdUseCase } from "@/usecase/form/getFormResponseByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class GetFormEntryByIdController { //TODO: trocar este nome para GetFormEntryByIdController
  async handle(req: FastifyRequest, res: FastifyReply) {
    const getFormResponseByIdRequestParams = z.object({
      entryId: z.string().uuid(),
    })
    const { entryId } = getFormResponseByIdRequestParams.parse(req.params)

    const formRepository = new PrismaFormRepository()
    const getFormResponseByIdUseCase = new GetFormResponseByIdUseCase(formRepository)

    const formResponse = await getFormResponseByIdUseCase.execute(entryId)

    return res.status(200).send(formResponse)
  }
}