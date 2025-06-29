import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { ListFormEntryByUserIdUseCase } from "@/usecase/form/listFormEntryByUserIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListFormEntryByUserIdController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const listFormEntryByUserIdRequestParams = z.object({
      userId: z.string().uuid()
    })
    const {userId} = listFormEntryByUserIdRequestParams.parse(req.params)

    const userRepository = new PrismaUserRepository()
    const formRepository = new PrismaFormRepository()

    const listFormEntryByUserIdUseCase = new ListFormEntryByUserIdUseCase(
      formRepository,
      userRepository
    )

    const formEntries = await listFormEntryByUserIdUseCase.execute(userId)

    return res.status(200).send(formEntries)
  }
}