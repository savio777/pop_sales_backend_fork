import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaUserCompanyRepository } from "@/repository/prisma/prismaUserCompanyRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import bcrypt from 'bcrypt';
import { CreateUserUseCase } from "@/usecase/user/createUserUseCase";

export class SignUpController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const signUpSchema = z.object({
      name: z.string().min(5, "name is very small").max(50, "name is very big"),
      email: z.string().email(),
      password: z.string().min(4, "password is very small").max(20, "password is very big"),
      phone: z.string().min(8, "phone number is very small").max(20, "phone number is very big").optional(),
      companyId: z.string().uuid()
    })

    const data = signUpSchema.parse(req.body)

    const userRepository = new PrismaUserRepository()
    const companyRepository = new PrismaCompanyRepository()
    const userCompanyRepository = new PrismaUserCompanyRepository()

    const signUpUseCase = new CreateUserUseCase(
      userRepository, 
      companyRepository,
      userCompanyRepository
    )

    const saltRounds = 10; 
    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    const result = await signUpUseCase.execute({
      name: data.name,
      email: data.email,
      companyId: data.companyId,
      password: passwordHash,
      phone: data.phone
    });

    const { password, ...userWithOutPassword } = result.user

    return res.status(201).send({user: userWithOutPassword})
  }
}