import { PrismaClientRepository } from "@/repository/prisma/prismaClientRepository";
import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaServiceAssessmentRepository } from "@/repository/prisma/prismaServiceAssessmentRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { CreateServiceAssessmentUseCase } from "@/usecase/serviceAssessment/createServiceAssessmentUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateServiceAssessmentController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const createServiceAssessmentRequestBody = z.object({
      clientId: z.string().uuid(),
      companyId: z.string().uuid(),
      ratingStars: z.coerce.number(),
      userId: z.string().uuid(),
      description: z.string().optional()
    })

    const { clientId, companyId, ratingStars, userId, description } = createServiceAssessmentRequestBody.parse(req.body);

    const serviceAssessmentRepository = new PrismaServiceAssessmentRepository()
    const userRepository = new PrismaUserRepository()
    const clientRepository = new PrismaClientRepository()
    const companyRepository = new PrismaCompanyRepository()

    const createServiceAssessmentUseCase = new CreateServiceAssessmentUseCase(
      serviceAssessmentRepository,
      userRepository,
      clientRepository,
      companyRepository
    )

    const serviceAssessment = await createServiceAssessmentUseCase.execute({
      clientId, companyId, ratingStars, userId, description
    })

    return res.send(serviceAssessment)
  }
}