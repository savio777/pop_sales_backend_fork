import { CompanyRepository } from "@/repository/companyRepository";

interface UpdateCompanySchema {
  name: string
}

export class UpdateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(
    {id, data}:
    {id: string, data: UpdateCompanySchema}
  ){

    const company = await this.companyRepository.update({
      id, data
    })

    return {company}
  }
}