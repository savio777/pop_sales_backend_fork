import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { FormRepository } from "@/repository/formRepository";

export class ListFormByCompanyIdUseCase {
  constructor(
    private readonly formRepository: FormRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(companyId: string) {
    const company = await this.companyRepository.getById(companyId)
    if (!company) {
      throw new NotFoundError("Empresa não encontrada")
    }
    const forms = await this.formRepository.listByCompanyId(companyId)
    return forms 
  }
}