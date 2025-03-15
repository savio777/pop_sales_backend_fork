import { PrismaUserCompanyRepository } from "@/repository/prisma/prismaUserCompanyRepository";
import { ListUserCompanyUseCase } from "@/usecase/userCompany/listUserCompanyUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListUserCompanyController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const listUserCompaniesQuery = z.object({
      limit: z.coerce.number().default(200),
      page: z.coerce.number().default(1),
    });
    
    const listUserCompaniesParams = z.object({
      companyId: z.string().uuid()
    });

    const {page, limit} = listUserCompaniesQuery.parse(req.query)
    const {companyId} = listUserCompaniesParams.parse(req.params)

    const userCompanyRepository = new PrismaUserCompanyRepository()
    const lsitUserCompanyUseCase = new ListUserCompanyUseCase(
      userCompanyRepository
    )

    const userCompanies = await lsitUserCompanyUseCase.execute({
      limit,
      companyId,
      page
    })

    return res.status(200).send(userCompanies)
  }
}