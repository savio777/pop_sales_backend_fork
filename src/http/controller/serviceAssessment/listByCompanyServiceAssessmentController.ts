import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaServiceAssessmentRepository } from "@/repository/prisma/prismaServiceAssessmentRepository";
import { ListByCompanyServiceAssessmentUseCase } from "@/usecase/serviceAssessment/listByCompanyServiceAssessmentUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListByCompanyServiceAssessmentController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const listByCompanyServiceAssessmentRequestParams = z.object({
      companyId: z.string().uuid(),
    });

    const { companyId } = listByCompanyServiceAssessmentRequestParams.parse(
      req.params
    );

    const serviceAssessmentRepository = new PrismaServiceAssessmentRepository();
    const companyRepository = new PrismaCompanyRepository();

    const listByCompanyServiceAssessmentUseCase =
      new ListByCompanyServiceAssessmentUseCase(
        serviceAssessmentRepository,
        companyRepository
      );

    const serviceAssessment =
      await listByCompanyServiceAssessmentUseCase.execute(companyId);

    return res.send(serviceAssessment);
  }
}
