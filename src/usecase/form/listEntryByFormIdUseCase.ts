import { FormRepository } from "@/repository/formRepository";

export class ListEntryByFormIdUseCase {
  constructor(
    private readonly formRepository: FormRepository
  ) {}

  async execute(formId: string) {
    const entries = await this.formRepository.listEntryByFormId(formId);
    return entries;
  }
}