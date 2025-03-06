import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
import { UserRepository } from "@/repository/userRepository";
import { FastifyReply, FastifyRequest } from "fastify";

export class GetMayUserController {
  constructor(
    private readonly userRepository: UserRepository
  ){}

  async handle(req: FastifyRequest, res: FastifyReply){
    if (!req.userAuth?.id) {
      throw new BadRequestError("userId not informed");
    }
    const userId = req.userAuth.id

    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new NotFoundError("user not found")
    }

    return res.status(200).send(user)
  }
}