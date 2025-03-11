import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { DeleteRotationUseCase } from "@/usecase/rotation/deleteRotationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class DeleteRotationController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const deleteRotationRequestParams = z.object({
      rotationId: z.string().uuid()
    })
    const {rotationId} = deleteRotationRequestParams.parse(req.params)

    const rotationRepository = new PrismaRotationRepository()
    const deleteRotationUseCase = new DeleteRotationUseCase(
      rotationRepository
    )

    await rotationRepository.delete(rotationId)

    return res.status(200).send()
  }
}