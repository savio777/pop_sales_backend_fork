import { BadRequestError } from "@/error/badRequest.error";
import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { ListCompaniesUseCase } from "@/usecase/company/listCompaniesUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListCompaniesController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    if (!req.userAuth?.id) {
      throw new BadRequestError("userId not informed");
    }
    const userId = req.userAuth.id;

    const listCompaniesSchema = z.object({
      limit: z.coerce.number().default(200),
      page: z.coerce.number().default(1),
    });

    const { limit, page } = listCompaniesSchema.parse(req.query);

    const userRepository = new PrismaUserRepository();
    const companyRepository = new PrismaCompanyRepository();

    const listCompaniesUseCase = new ListCompaniesUseCase(
      userRepository,
      companyRepository
    );

    const companies = await listCompaniesUseCase.execute({
      userId,
      limit,
      page,
    });

    return res.status(200).send(companies);
  }
}
