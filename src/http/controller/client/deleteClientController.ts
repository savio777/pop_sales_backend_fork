import { PrismaClientRepository } from "@/repository/prisma/prismaClientRepository";
import { DeleteClientUseCase } from "@/usecase/client/deleteClientUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class DeleteClientController {
  async handler(req: FastifyRequest, res: FastifyReply) {
    const requestParams = z.object({
      id: z.string().uuid()
    })
    const { id } = requestParams.parse(req.params)
    const prismaClientRepository = new PrismaClientRepository()
    const deleteClientUseCase = new DeleteClientUseCase(prismaClientRepository)
    await deleteClientUseCase.execute(id)
    return res.status(200).send()
  }
}