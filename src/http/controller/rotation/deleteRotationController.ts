import { BadRequestError } from "@/error/badRequest.error";
import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaRotationStopRepository } from "@/repository/prisma/prismaRotationStopRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { DeleteRotationUseCase } from "@/usecase/rotation/deleteRotationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class DeleteRotationController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const userId = req.userAuth.id

    const deleteRotationRequestParams = z.object({
      rotationId: z.string().uuid()
    })
    const {rotationId} = deleteRotationRequestParams.parse(req.params)

    const rotationRepository = new PrismaRotationRepository()
    const userRepository = new PrismaUserRepository()
    const rotationStopRepository = new PrismaRotationStopRepository()
    const deleteRotationUseCase = new DeleteRotationUseCase(
      rotationRepository,
      rotationStopRepository,
      userRepository,
    )

    await deleteRotationUseCase.execute({
      rotationId,
      userId
    })

    return res.status(200).send()
  }
}