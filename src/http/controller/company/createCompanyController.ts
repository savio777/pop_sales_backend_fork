import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { CreateCompanyUseCase } from "@/usecase/company/createCompanyUseCase";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { z } from "zod";

export class CreateCompanyController {
  async handle(req: FastifyRequest, res: FastifyReply){    
    const createCompanySchema = z.object({
      name: z.string()
    })

    const {name} = createCompanySchema.parse(req.body)

    const companyRepository = new PrismaCompanyRepository()

    const createCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
    )

    const compay = await createCompanyUseCase.execute({name})

    return res.status(200).send(compay)
  }
}