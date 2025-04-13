import { NotFoundError } from "@/error/notfound.error";
import { FormRepository } from "@/repository/formRepository";

export class GetFormResponseByIdUseCase {
  constructor(private readonly formRepository: FormRepository) {}

  async execute(id: string) {
    const response = await this.formRepository.getResponseById(id);
    if (!response) {
      throw new NotFoundError("Resposta de formuário não encontrada");
    }

    return { response };
  }
}
