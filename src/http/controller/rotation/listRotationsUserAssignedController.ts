import { BadRequestError } from "@/error/badRequest.error";
import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { ListByAssignedIdUseCase } from "@/usecase/rotation/listByAssignedIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListRotationsUserAssignedController {
  async handle(req: FastifyRequest, res: FastifyReply){
    if (!req.userAuth?.id) {
      throw new BadRequestError("userId not informed");
    }
    const userId = req.userAuth.id

    const rotationRepository = new PrismaRotationRepository()
    const userRepository = new PrismaUserRepository()
    const listByAssignedIdUseCase = new ListByAssignedIdUseCase(
      rotationRepository,
      userRepository
    )
    const rotations = await listByAssignedIdUseCase.execute(userId)

    return res.status(200).send(rotations)
  }
}