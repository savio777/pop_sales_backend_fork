import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository";
import { GetFormEntryByIdUseCase } from "@/usecase/form/getFormEntryByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class GetFormEntryByIdController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const getFormResponseByIdRequestParams = z.object({
      entryId: z.string().uuid(),
    })
    const { entryId } = getFormResponseByIdRequestParams.parse(req.params)

    const formRepository = new PrismaFormRepository()
    const getFormEntryByIdUseCase = new GetFormEntryByIdUseCase(formRepository)

    const formEntry = await getFormEntryByIdUseCase.execute(entryId)

    return res.status(200).send(formEntry)
  }
}