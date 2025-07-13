import { PrismaFormRepository } from "@/repository/prisma/prismaFormRepository";
import { UpdateFormUseCase } from "@/usecase/form/updateFormUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class UpdateFormController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const updateFormRequestParams = z.object({
      formId: z.string().uuid(),
      companyId: z.string().uuid(),
    });

    const updateFormRequestBody = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      formType: z
        .enum(["CLIENT", "PROMOTER", "SELLER", "DELIVERER"])
        .optional(),
      questions: z.array(
        z.object({
          text: z.string(),
          required: z.boolean(),
          type: z.enum(["TEXT", "YES_NO", "MULTIPLE_CHOICE", "IMAGE"]),
        })
      ),
    });

    const { formId, companyId } = updateFormRequestParams.parse(req.params);
    const { questions, formType } = updateFormRequestBody.parse(req.body);

    const formRepository = new PrismaFormRepository();
    const updateFormUseCase = new UpdateFormUseCase(formRepository);

    const form = await updateFormUseCase.execute({
      formId,
      form: {
        companyId,
        formType,
      },
      questions,
    });

    return res.status(200).send(form);
  }
}
