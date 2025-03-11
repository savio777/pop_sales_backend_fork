import { BadRequestError } from "@/error/badRequest.error";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { GetUserByIdUseCase } from "@/usecase/user/getUserByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class GetMyUserController {

  async handle(req: FastifyRequest, res: FastifyReply){
    if (!req.userAuth?.id) {
      throw new BadRequestError("userId not informed");
    }
    const userId = req.userAuth.id

    const userRepository = new PrismaUserRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)

    const {user} = await getUserByIdUseCase.execute(userId)

    const {password, ...userWithOutPassword} = user

    return res.status(200).send({user: userWithOutPassword})
  }
}