import { PrismaServiceAssessmentRepository } from "@/repository/prisma/prismaServiceAssessmentRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { ListByUserServiceAssessmentUseCase } from "@/usecase/serviceAssessment/listByUserServiceAssessmentUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListByUserServiceAssessmentController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const listByUserServiceAssessmentRequestParams = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = listByUserServiceAssessmentRequestParams.parse(req.params);

    const serviceAssessmentRepository = new PrismaServiceAssessmentRepository()
    const userRepository = new PrismaUserRepository()

    const listByUserServiceAssessmentUseCase = new ListByUserServiceAssessmentUseCase(
      serviceAssessmentRepository,
      userRepository
    )

    const serviceAssessment = await listByUserServiceAssessmentUseCase.execute(userId)

    return res.send(serviceAssessment)
  }
}