import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { UserRepository } from "@/repository/userRepository";
import { FastifyReply, FastifyRequest } from "fastify";

export class GetMayUserController {

  async handle(req: FastifyRequest, res: FastifyReply){
    if (!req.userAuth?.id) {
      throw new BadRequestError("userId not informed");
    }
    const userId = req.userAuth.id

    const userRepository = new PrismaUserRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase



    return res.status(200).send(user)
  }
}