import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { UpdateRotationUseCase } from "@/usecase/rotation/updationRotationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class UpdateRotationController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const createdById = req.userAuth!.id

    const updateRotationRequestBody = z.object({
      rotationId: z.string().uuid(),
    })
    const updateRotationRequestParams = z.object({
      description: z.string().optional()
    })

    const data = updateRotationRequestParams.parse(req.params)
    const {rotationId} = updateRotationRequestBody.parse(req.body)

    const rotationRepository = new PrismaRotationRepository()
    const updateRotationUseCase = new UpdateRotationUseCase(
      rotationRepository,
    )

    const rotation = await updateRotationUseCase.execute({
      id: rotationId,
      data
    })

    return res.status(200).send(rotation)
  }
}