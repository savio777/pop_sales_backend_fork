import { BadRequestError } from "@/error/badRequest.error";
import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { CreateRotationUseCase } from "@/usecase/rotation/createRotationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateRotationController {
  async handle(req: FastifyRequest, res: FastifyReply){
     if (!req.userAuth?.id) {
      throw new BadRequestError("userId not informed");
    }
    const createdById = req.userAuth.id

    const assignedRequestBody = z.object({
      assignedToId: z.string().uuid()
    })

    const {assignedToId} = assignedRequestBody.parse(req.body)

    const rotationRepository = new PrismaRotationRepository()
    const userRepository = new PrismaUserRepository()
    const createRotationUseCase = new CreateRotationUseCase(
      rotationRepository,
      userRepository
    )

    const rotation = await createRotationUseCase.execute({
      assignedToId, createdById
    })

    return res.status(200).send(rotation)
  }
}