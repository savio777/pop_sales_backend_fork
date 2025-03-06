import { UserCompanyRepository } from "@/repository/userCompanyRepository";

export class ListUserCompanyUseCase {
  constructor(
    private readonly userCompanyRepository: UserCompanyRepository
  ){}

  async execute(
    data:
    {companyId: string, limit: number, page: number}
  ){
    const userCompanies = await this.userCompanyRepository.list(data)
    return userCompanies
  }
}