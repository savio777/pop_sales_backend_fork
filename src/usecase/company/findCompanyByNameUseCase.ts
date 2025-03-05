import { CompanyRepository } from "@/repository/companyRepository";

export class FindCompanyByNameUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(name: string){
    const company = await this.companyRepository.findByName(name)
    return {company}
  }
}