import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { UpdateRotationUseCase } from "@/usecase/rotation/updationRotationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class UpdateRotationController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const createdById = req.userAuth.id

    const updateRotationRequestBody = z.object({
      assignedToId: z.string().uuid(),
    })
    const updateRotationRequestParams = z.object({
      rotationId: z.string().uuid()
    })

    const {rotationId} = updateRotationRequestParams.parse(req.params)
    const {assignedToId} = updateRotationRequestBody.parse(req.body)

    const rotationRepository = new PrismaRotationRepository()
    const userRepository = new PrismaUserRepository()
    const updateRotationUseCase = new UpdateRotationUseCase(
      rotationRepository,
      userRepository
    )

    const rotation = await updateRotationUseCase.execute({
      id: rotationId,
      assignedToId, 
      createdById
    })

    return res.status(200).send(rotation)
  }
}