import { BadRequestError } from "@/error/badRequest.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserRepository } from "@/repository/userRepository";

interface UpdateCompanySchema {
  name: string
}

export class UpdateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository
  ){}

  async execute(
    {id, data, userId}:
    {id: string, data: UpdateCompanySchema, userId: string}
  ){
    
    const company = await this.companyRepository.getById(id)
    if(!company){
      throw new BadRequestError("company not exist")
    }

    if(company.userId !== userId){
      throw new UnauthorizedError("you not have permission to edit this company")
    }

    const companyUpdate = await this.companyRepository.update({
      id, data
    })

    return {company:companyUpdate}
  }
}