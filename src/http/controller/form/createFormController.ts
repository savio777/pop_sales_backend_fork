import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository";
import { CreateFormUseCase } from "@/usecase/form/createFormUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateFormController {
  async handle(req: FastifyRequest, res: FastifyReply){

    const createFormRequestBody = z.object({
      companyId: z.string().uuid(),
      formType: z.enum(["CLIENT", "PROMOTER", "SELLER","DELIVERER"]),
      questions: z.array(
        z.object({
          text: z.string(),
          type: z.enum(["TEXT", "YES_NO", "MULTIPLE_CHOICE", "IMAGE"]),
          required: z.coerce.boolean(),
        })
      )
    })

    const { companyId, formType, questions } = createFormRequestBody.parse(req.body)

    const formRepository = new PrismaFormRepository() 
    const companyRepository = new PrismaCompanyRepository()
    const createForm = new CreateFormUseCase(
      formRepository,
      companyRepository
    );

    const form = await createForm.execute({
      companyId, formType, questions
    })

    return res.status(201).send(form)
  }
}