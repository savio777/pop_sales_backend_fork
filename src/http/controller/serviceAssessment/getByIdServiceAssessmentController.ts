import { PrismaServiceAssessmentRepository } from "@/repository/prisma/prismaServiceAssessmentRepository";
import { GetByIdServiceAssessmentUseCase } from "@/usecase/serviceAssessment/getByIdServiceAssessmentUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class GetByIdServiceAssessmentController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const getByIdServiceAssessmentRequestParams = z.object({
      assessmentId: z.string().uuid(),
    })

    const { assessmentId } = getByIdServiceAssessmentRequestParams.parse(req.params);

    const serviceAssessmentRepository = new PrismaServiceAssessmentRepository()

    const getByIdServiceAssessmentUseCase = new GetByIdServiceAssessmentUseCase(
      serviceAssessmentRepository,
    )

    const serviceAssessment = await getByIdServiceAssessmentUseCase.execute(assessmentId)

    return res.send(serviceAssessment)
  }
}