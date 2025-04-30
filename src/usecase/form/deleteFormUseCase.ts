import { NotFoundError } from "@/error/notfound.error";
import { FormRepository } from "@/repository/formRepository";

export class DeleteFormUseCase {
  constructor(private formRepository: FormRepository) {}
  async execute(id: string) {
    const formExist = await this.formRepository.getById(id);
    if (!formExist) {
      throw new NotFoundError("Formulário não encontrado");
    }

    const form = await this.formRepository.delete(id);
    return { form };
  }
}
