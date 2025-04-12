import { FormRepository } from "@/repository/formRepository";

export class GetFormByIdUseCase {
  constructor(
    private prismaFormRepository: FormRepository
  ){}
  async execute(id: string) {
    return await this.prismaFormRepository.getById(id)
  }
}