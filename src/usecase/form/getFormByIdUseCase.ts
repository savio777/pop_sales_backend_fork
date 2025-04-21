import { FormRepository } from "@/repository/formRepository";

export class GetFormByIdUseCase {
  constructor(
    private prismaFormRepository: FormRepository
  ){}
  async execute(id: string) {
    const form = await this.prismaFormRepository.getById(id)
    return {form}
  }
}