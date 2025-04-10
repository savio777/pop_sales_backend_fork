import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { PrismaUserRotaionRepository } from "@/repository/prisma/prismaUserRotationRepository";
import { ListRotationByUserIdUseCase } from "@/usecase/rotation/listRotationByUserIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListRotationsByUserIdController {
  async handle(req: FastifyRequest, res: FastifyReply){

    const listRotationByUserIdRequestParams = z.object({
      userId: z.string().uuid()
    })

    const { userId } = listRotationByUserIdRequestParams.parse(req.params)

    const userRotationRepository = new PrismaUserRotaionRepository()
    const userRepository = new PrismaUserRepository()

    const listRotationByUserIdUseCase = new ListRotationByUserIdUseCase(
      userRepository,
      userRotationRepository,
    )
    const rotations = await listRotationByUserIdUseCase.execute(userId)

    return res.status(200).send(rotations)
  }
}