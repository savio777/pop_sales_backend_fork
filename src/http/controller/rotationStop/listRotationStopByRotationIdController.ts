import { PrismaRotationStopRepository } from "@/repository/prisma/prismaRotationStopRepository";
import { ListRotationStopByRotationIdUseCase } from "@/usecase/rotationStop/listRotationStopByRotationIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListRotationStopByRotationIdController {
  async handle(req: FastifyRequest, res:FastifyReply){
    const listRotationRequestParams = z.object({
      rotationId: z.string().uuid()
    })
    const {rotationId} = listRotationRequestParams.parse(req.params)

    const rotationStopRepository = new PrismaRotationStopRepository()
    const listRotationStopByRotationIdUseCase = new ListRotationStopByRotationIdUseCase(
      rotationStopRepository
    )

    const rotationsStop = await listRotationStopByRotationIdUseCase.execute(rotationId)

    return res.status(200).send(rotationsStop)
  }
}