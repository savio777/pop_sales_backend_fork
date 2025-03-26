import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { ListCompaniesUseCase } from "@/usecase/company/listCompaniesUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListCompaniesController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const userId = req.userAuth.id;

    const listCompaniesSchema = z.object({
      limit: z.coerce.number().default(200),
      page: z.coerce.number().default(1),
    });

    // TODO: FIX ME - adicionar paginação
    //  const { limit, page } = listCompaniesSchema.parse(req.query);

    const companyRepository = new PrismaCompanyRepository();

    const listCompaniesUseCase = new ListCompaniesUseCase(
      companyRepository
    );

    const companies = await listCompaniesUseCase.execute();

    return res.status(200).send(companies);
  }
}
