import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";

export class ListUserCompanyUseCase {
  constructor(
    private readonly userCompanyRepository: UserCompanyRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(
    data:
    {companyId: string, limit: number, page: number}
  ){
    const company = await this.companyRepository.getById(data.companyId)
    if(!company){
      throw new NotFoundError("Empresa não encontrada.")
    }
    const userCompanies = await this.userCompanyRepository.list(data)
    return {userCompanies}
  }
}