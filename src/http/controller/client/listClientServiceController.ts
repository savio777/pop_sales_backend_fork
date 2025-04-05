import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { ListClientServiceUseCase } from "@/usecase/client/ListClientServiceUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListClientServiceController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const listClientServiceRequestParams = z.object({
      companyId: z.string().uuid(),
    });
    const { companyId } = listClientServiceRequestParams.parse(req.params);

    const companyRepository = new PrismaCompanyRepository()
    const listClientServiceUseCase = new ListClientServiceUseCase( 
      companyRepository
    );

    const clientService = await listClientServiceUseCase.execute({
      companyId,
    })

    return res.status(200).send({ clientService });
  }
}