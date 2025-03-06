import { CompanyRepository } from "@/repository/companyRepository";

export class DeleteCompanyUdeCase {
  constructor(
    private readonly companyRepositoy: CompanyRepository
  ){}

  async execute(id: string){
    await this.companyRepositoy.delete(id)
  }
}