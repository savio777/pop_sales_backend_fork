import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { ListCompaniesUseCase } from "@/usecase/company/listCompaniesUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListCompaniesController {
  async handle(req: FastifyRequest, res: FastifyReply) {

    const companyRepository = new PrismaCompanyRepository();

    const listCompaniesUseCase = new ListCompaniesUseCase(
      companyRepository
    );

    const companies = await listCompaniesUseCase.execute();

    return res.status(200).send(companies);
  }
}
