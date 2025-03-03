import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { SignUpUseCase } from "@/usecase/auth/signInUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class SignInController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const signUpSchema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const data = signUpSchema.parse(req.body)

    const userRepository = new PrismaUserRepository()
    const signUpUseCase = new SignUpUseCase(userRepository)

    const {user, token} = await signUpUseCase.execute(data)

    return res.status(200).send({user, token})
  }
}