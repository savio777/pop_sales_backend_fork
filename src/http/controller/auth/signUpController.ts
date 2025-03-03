import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { SignUpUseCase } from "@/usecase/auth/signUpUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class SignUpController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const signUpSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      phone: z.string().optional()
    })

    const data = signUpSchema.parse(req.body)

    const userRepository = new PrismaUserRepository()
    const signUpUseCase = new SignUpUseCase(userRepository)

    const {user} = await signUpUseCase.execute(data)

    return res.status(200).send({user})
  }
}