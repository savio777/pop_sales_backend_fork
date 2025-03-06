import { BadRequestError } from "@/error/badRequest.error";
import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { CreateCompanyUseCase } from "@/usecase/company/createCompanyUseCase";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { z } from "zod";

export class CreateCompanyController {
  async handle(req: FastifyRequest, res: FastifyReply){

    if (!req.userAuth?.id) {
      throw new BadRequestError("userId not informed");
    }
    const userId = req.userAuth.id
    
    const createCompanySchema = z.object({
      name: z.string()
    })

    const {name} = createCompanySchema.parse(req.body)

    const companyRepository = new PrismaCompanyRepository()
    const userCompany = new PrismaUserRepository()

    const createCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      userCompany
    )

    await createCompanyUseCase.execute({name, userId})

    return res.status(200).send()
  }
}