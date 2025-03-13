import { BadRequestError } from "@/error/badRequest.error";
import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaRotationStopRepository } from "@/repository/prisma/prismaRotationStopRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { CreateRotationUseCase } from "@/usecase/rotation/createRotationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateRotationController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const stopsRequestBody = z.object({
      sequence: z.coerce.number(),
      address: z.string()
    })

    const assignedRequestBody = z.object({
      assignedToId: z.string().uuid(),
      stops: z.array(stopsRequestBody),
      tasks: z.array(z.string().uuid())
    })

    const {assignedToId, stops, tasks} = assignedRequestBody.parse(req.body)

    const rotationRepository = new PrismaRotationRepository()
    const userRepository = new PrismaUserRepository()
    const rotationStopRepository = new PrismaRotationStopRepository()
    const createRotationUseCase = new CreateRotationUseCase(
      rotationRepository,
      rotationStopRepository,
      userRepository,
    )

    if (!req.userAuth?.id) {
      throw new BadRequestError("userId not informed");
    }
    const createdById = req.userAuth.id


    const rotation = await createRotationUseCase.execute({
      assignedToId, createdById, stops, tasks
    })

    return res.status(200).send(rotation)
  }
}