import { PrismaClientRepository } from "@/repository/prisma/prismaClientRepository";
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
      clientId: z.string().uuid()
    });
    
    const {rotationId, sequence, clientId} = stopsRequestBody.parse(req.body)

    const stopRepository = new PrismaStopRepository()
    const rotationRepository = new PrismaRotationRepository()
    const clientRepository = new PrismaClientRepository()

    const createStopUseCase = new CreateStopUseCase(
      stopRepository,
      rotationRepository,
      clientRepository
    )

    const stop = await createStopUseCase.execute({
      rotationId, 
      clientId,
      sequence
    })

    return res.status(200).send(stop)
  }
}
