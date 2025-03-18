import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";

export class GetCompanyByIdUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(id: string){
    const company = await this.companyRepository.getById(id)
    if(!company){
      throw new NotFoundError("company not exist")
    }
    return {company}
  }
}