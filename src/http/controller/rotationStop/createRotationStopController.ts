import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaRotationStopRepository } from "@/repository/prisma/prismaRotationStopRepository";
import { CreateRotationStopUseCase } from "@/usecase/rotationStop/createRotationStop";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateRotationStopController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const stopsRequestBody = z.object({
      sequence: z.coerce.number(),
      address: z.string(),
    });

    const rotationStopRepository = new PrismaRotationStopRepository()
    const rotationRepository = new PrismaRotationRepository()
    const createRotationStopUseCase = new CreateRotationStopUseCase(
      rotationStopRepository,
      rotationRepository
    )

    await createRotationStopUseCase.execute({
      
    })
  }
}
