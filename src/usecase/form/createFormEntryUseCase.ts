import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { FormRepository } from "@/repository/formRepository";
import { UserRepository } from "@/repository/userRepository";

interface Answer {
  questionId: string;
  text: string;
  imageUrl?: string;
}

// resposta do formulario
export class CreateFormEntryUseCase {
  constructor(
    private readonly formRepository: FormRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    formTemplateId,
    answers,
    userId,
    companyId,
    taskId,
  }: {
    formTemplateId: string;
    answers: Answer[];
    userId: string;
    companyId: string;
    taskId: string;
  }) {
    const company = await this.companyRepository.getById(companyId);
    if (!company) {
      throw new NotFoundError("Empresa não encontrada");
    }

    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new NotFoundError("Usuário não encontrado")
    }

    const formTemplate = await this.formRepository.getById(formTemplateId)
    if(!formTemplate){
      throw new NotFoundError("Formulário não encontrado")
    }

    const formEntry = await this.formRepository.createFormEntry({
      userId,
      answers,
      companyId,
      formTemplateId,
      taskId,
    });

    return {formEntry};
  }
}
