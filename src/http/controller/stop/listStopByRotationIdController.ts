import { PrismaStopRepository } from "@/repository/prisma/prismaStopRepository";
import { ListStopByRotationIdUseCase } from "@/usecase/stop/listStopByRotationIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListStopByRotationIdController {
  async handle(req: FastifyRequest, res:FastifyReply){
    const listRotationRequestParams = z.object({
      rotationId: z.string().uuid()
    })
    const {rotationId} = listRotationRequestParams.parse(req.params)

    const stopRepository = new PrismaStopRepository()
    const listStopByRotationIdUseCase = new ListStopByRotationIdUseCase(
      stopRepository
    )

    const rotationsStop = await listStopByRotationIdUseCase.execute(rotationId)

    return res.status(200).send(rotationsStop)
  }
}