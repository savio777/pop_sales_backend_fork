import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaRotationStopRepository } from "@/repository/prisma/prismaRotationStopRepository";
import { CreateRotationStopUseCase } from "@/usecase/rotationStop/createRotationStop";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateRotationStopController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const stopsRequestBody = z.object({
      rotationId: z.string().uuid(),
      sequence: z.coerce.number(),
      address: z.string(),
    });
    
    const {address, rotationId, sequence} = stopsRequestBody.parse(req.body)

    const rotationStopRepository = new PrismaRotationStopRepository()
    const rotationRepository = new PrismaRotationRepository()
    const createRotationStopUseCase = new CreateRotationStopUseCase(
      rotationStopRepository,
      rotationRepository
    )

    const stop = await createRotationStopUseCase.execute({
      rotationId, 
      stop: {
        address, sequence
      }
    })

    return res.status(200).send(stop)
  }
}
