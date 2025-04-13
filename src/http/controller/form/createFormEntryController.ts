import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { CreateFormEntryUseCase } from "@/usecase/form/createFormEntryUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateFormEntryController {
  async handle(req: FastifyRequest, res: FastifyReply){

    const createFormEntryRequestBody = z.object({
      companyId: z.string().uuid(),
      formTemplateId: z.string().uuid(),
      taskId: z.string().uuid(),
      userId: z.string().uuid(),
      answers: z.array(
        z.object({
          questionId: z.string().uuid(),
          text: z.string(),
          imageUrl: z.string().optional(),
        })
      )
    })

    const { companyId, formTemplateId, userId, answers, taskId} = createFormEntryRequestBody.parse(req.body)

    const formRepository = new PrismaFormRepository() 
    const companyRepository = new PrismaCompanyRepository()
    const userRepository = new PrismaUserRepository()

    const createFormEntry = new CreateFormEntryUseCase(
      formRepository,
      companyRepository,
      userRepository
    );

    const formEntry = await createFormEntry.execute({
      userId, answers, companyId, formTemplateId, taskId
    })

    return res.status(201).send(formEntry)
  }
}