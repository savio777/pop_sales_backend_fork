import { CompanyRepository } from "@/repository/companyRepository";

export class ListCompaniesUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(){
    const companies = await this.companyRepository.list()
    return {companies}
  }
}