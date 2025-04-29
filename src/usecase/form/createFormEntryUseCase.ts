import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { FormRepository } from "@/repository/formRepository";
import { UserRepository } from "@/repository/userRepository";

interface Answer {
  questionId: string;
  text: string;
  imageUrl?: string;
}

export class CreateFormEntryUseCase {
  constructor(
    private readonly formRepository: FormRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute({
    formId,
    answers,
    userId,
    companyId,
    taskId,
  }: {
    formId: string;
    answers: Answer[];
    userId?: string;
    companyId: string;
    taskId?: string;
  }) {
    const company = await this.companyRepository.getById(companyId);
    if (!company) {
      throw new NotFoundError("Empresa não encontrada");
    }

    if (userId) {
      const user = await this.userRepository.getById(userId);
      if (!user) {
        throw new NotFoundError("Usuário não encontrado");
      }
    }

    const formTemplate = await this.formRepository.getById(formId);
    if (!formTemplate) {
      throw new NotFoundError("Formulário não encontrado");
    }

    const data = await this.formRepository.createFormEntry({
      userId,
      answers,
      companyId,
      formId,
      taskId,
    });

    const formEntry = {
      id: data?.id,
      formId: data?.formTemplateId,
      companyId: data?.companyId,
      taskId: data?.taskId,
      userId: data?.userId,
    };

    return { formEntry };
  }
}
