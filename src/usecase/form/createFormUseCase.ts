import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { FormRepository } from "@/repository/formRepository";
import { FormType, QuestionType } from "@prisma/client";

export class CreateFormUseCase {
  constructor(
    private readonly formRepository: FormRepository,
    private readonly companyRepository: CompanyRepository
  ) {}
  async execute({
    companyId,
    formType,
    questions,
  }: {
    companyId: string;
    formType: FormType;
    questions: {
      required: boolean;
      text: string;
      type: QuestionType;
    }[];
  }) {
    const company = await this.companyRepository.getById(companyId);
    if (!company) {
      throw new NotFoundError("Empresa não encontrada");
    }

    if (questions.length === 0) {
      throw new BadRequestError("Formulário deve ter pelo menos uma pergunta");
    }

    const form = await this.formRepository.create({
      form: {
        formType,
        companyId,
      },
      questions,
    });

    return { form };
  }
}
