import { BadRequestError } from "@/error/badRequest.error";
import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { ListByCreatedIdUseCase } from "@/usecase/rotation/listByCreatedIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListRotationsUserCreatedController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const userId = req.userAuth.id

    const rotationRepository = new PrismaRotationRepository()
    const userRepository = new PrismaUserRepository()
    const listByAssignedIdUseCase = new ListByCreatedIdUseCase(
      rotationRepository,
      userRepository
    )
    const rotations = await listByAssignedIdUseCase.execute(userId)

    return res.status(200).send(rotations)
  }
}