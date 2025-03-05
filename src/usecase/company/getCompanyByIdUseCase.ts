import { CompanyRepository } from "@/repository/companyRepository";

export class GetCompanyByIdUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(id: string){
    const company = await this.companyRepository.getById(id)
    return company
  }
}