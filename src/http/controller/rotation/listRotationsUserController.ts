import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { PrismaUserRotaionRepository } from "@/repository/prisma/prismaUserRotationRepository";
import { ListRotationByUserIdUseCase } from "@/usecase/rotation/listRotationByUserIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListRotationsByUserIdController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const userId = req.userAuth.id

    const userRotationRepository = new PrismaUserRotaionRepository()
    const userRepository = new PrismaUserRepository()
    const listByAssignedIdUseCase = new ListRotationByUserIdUseCase(
      userRepository,
      userRotationRepository,
    )
    const rotations = await listByAssignedIdUseCase.execute(userId)

    return res.status(200).send(rotations)
  }
}