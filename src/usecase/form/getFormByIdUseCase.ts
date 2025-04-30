import { NotFoundError } from "@/error/notfound.error";
import { FormRepository } from "@/repository/formRepository";

export class GetFormByIdUseCase {
  constructor(private prismaFormRepository: FormRepository) {}
  async execute(id: string) {
    const form = await this.prismaFormRepository.getById(id);
    if(!form){
      throw new NotFoundError("Formulário não encontrado")
    }
    return { form };
  }
}
