import { NotFoundError } from "@/error/notfound.error";
import { FormRepository } from "@/repository/formRepository";
import { FormType, QuestionType } from "@prisma/client";

interface CreateForm {
  formType?: FormType;
  companyId: string;
}

interface CreateQuestion {
  text: string;
  required: boolean;
  type: QuestionType;
}

export class UpdateFormUseCase {
  constructor(private readonly formRepository: FormRepository) {}

  async execute({
    formId,
    form,
    questions,
  }: {
    formId: string;
    form: CreateForm;
    questions: CreateQuestion[];
  }) {
    const formExist = await this.formRepository.getById(formId);
    if (!formExist) {
      throw new NotFoundError("Formulário não encontrado");
    }

    const data = await this.formRepository.update({ formId, form, questions });
    return {form: data};
  }
}
