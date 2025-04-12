import { NotFoundError } from "@/error/notfound.error";
import { FormRepository } from "@/repository/formRepository";

export class DeleteFormUseCase {
  constructor(
    private formRepository: FormRepository
  ) {}
  async execute(id: string) {
    const form = await this.formRepository.getById(id);
    if (!form) {
      throw new NotFoundError("Formulário não encontrado");
    }

    await this.formRepository.delete(id);
  }
}