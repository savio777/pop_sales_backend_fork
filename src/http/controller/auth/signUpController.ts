import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { SignUpUseCase } from "@/usecase/auth/signUpUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class SignUpController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const signUpSchema = z.object({
      name: z.string().min(5, "name is very small").max(50, "name is very big"),
      email: z.string().email(),
      password: z.string().min(4, "password is very small").max(20, "password is very big"),
      phone: z.string().min(8, "phone number is very small").max(20, "phone number is very big").optional()
    })

    const data = signUpSchema.parse(req.body)

    const userRepository = new PrismaUserRepository()
    const signUpUseCase = new SignUpUseCase(userRepository)

    const {user} = await signUpUseCase.execute(data)

    return res.status(201).send({user})
  }
}