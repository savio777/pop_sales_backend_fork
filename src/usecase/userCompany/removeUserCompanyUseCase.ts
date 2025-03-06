import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";
import { UserRepository } from "@/repository/userRepository";

export class RemoveUserCompanyUseCase {
  constructor(
    private readonly userCompanyRepository: UserCompanyRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository
  ){}

  async execute(
    id: string
  ){

    const userCompanyExist = await this.userCompanyRepository.getById(id)
    if(!userCompanyExist){
      throw new BadRequestError("user company not exist")
    }

    await this.userCompanyRepository.remove(id)
    
  }
}