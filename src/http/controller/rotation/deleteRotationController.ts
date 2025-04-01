import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaStopRepository } from "@/repository/prisma/prismaStopRepository";
import { PrismaTaskRepository } from "@/repository/prisma/prismaTaskRepository";
import { DeleteRotationUseCase } from "@/usecase/rotation/deleteRotationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class DeleteRotationController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const userId = req.userAuth!.id

    const deleteRotationRequestParams = z.object({
      rotationId: z.string().uuid()
    })
    const {rotationId} = deleteRotationRequestParams.parse(req.params)

    const rotationRepository = new PrismaRotationRepository()
    const stopRepository = new PrismaStopRepository()
    const taskRepository = new PrismaTaskRepository()
    
    const deleteRotationUseCase = new DeleteRotationUseCase(
      rotationRepository,
      stopRepository,
      taskRepository
    )

    await deleteRotationUseCase.execute({rotationId})

    return res.status(200).send()
  }
}