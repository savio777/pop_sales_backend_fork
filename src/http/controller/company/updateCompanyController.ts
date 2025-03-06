import { BadRequestError } from "@/error/badRequest.error";
import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { UpdateCompanyUseCase } from "@/usecase/company/updateCompanyUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class UpdateCompanyController {
  async handle(req: FastifyRequest, res: FastifyReply){
    if (!req.userAuth?.id) {
      throw new BadRequestError("userId not informed");
    }
    const userId = req.userAuth.id

    const updateCompanyParams = z.object({
      companyId: z.string(),
    })

    const updateCompanyBody = z.object({
      name: z.string()
    })

    const {companyId} = updateCompanyParams.parse(req.params)
    const {name} = updateCompanyBody.parse(req.body)

    const companyRepository = new PrismaCompanyRepository()
    const userRepository = new PrismaUserRepository()
    const updateCompanyUseCase = new UpdateCompanyUseCase(
      companyRepository,
      userRepository
    )

    const company = await updateCompanyUseCase.execute({
      id: companyId,
      userId,
      name
    })

    return res.status(200).send(company)
  }
}