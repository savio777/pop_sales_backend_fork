import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";

export class DeleteCompanyUdeCase {
  constructor(
    private readonly companyRepositoy: CompanyRepository
  ){}

  async execute(id: string){
    const comapany = await this.companyRepositoy.getById(id)
    if(!comapany){
      throw new BadRequestError("Empresa não existe.")
    }
    
    await this.companyRepositoy.delete(id)
  }
}