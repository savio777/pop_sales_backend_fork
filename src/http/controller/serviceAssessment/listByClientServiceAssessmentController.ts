import { PrismaClientRepository } from "@/repository/prisma/prismaClientRepository";
import { PrismaServiceAssessmentRepository } from "@/repository/prisma/prismaServiceAssessmentRepository";
import { ListByClientServiceAssessmentUseCase } from "@/usecase/serviceAssessment/listByClientServiceAssessmentUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListByClientServiceAssessmentController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const ListByClientServiceAssessmentRequestParams = z.object({
      clientId: z.string().uuid(),
    })

    const { clientId } = ListByClientServiceAssessmentRequestParams.parse(req.params);

    const serviceAssessmentRepository = new PrismaServiceAssessmentRepository()
    const clientRepository = new PrismaClientRepository()

    const listByClientServiceAssessmentUseCase = new ListByClientServiceAssessmentUseCase(
      serviceAssessmentRepository,
      clientRepository,
    )

    const serviceAssessment = await listByClientServiceAssessmentUseCase.execute(clientId)

    return res.send(serviceAssessment)
  }
}