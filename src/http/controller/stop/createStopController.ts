import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaStopRepository } from "@/repository/prisma/prismaStopRepository";
import { CreateStopUseCase } from "@/usecase/stop/createStopUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateStopController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const stopsRequestBody = z.object({
      rotationId: z.string().uuid(),
      sequence: z.coerce.number(),
      address: z.string(),
    });
    
    const {address, rotationId, sequence} = stopsRequestBody.parse(req.body)

    const stopRepository = new PrismaStopRepository()
    const rotationRepository = new PrismaRotationRepository()

    const createStopUseCase = new CreateStopUseCase(
      stopRepository,
      rotationRepository
    )

    const stop = await createStopUseCase.execute({
      rotationId, 
      stop: {
        address, sequence
      }
    })

    return res.status(200).send(stop)
  }
}
