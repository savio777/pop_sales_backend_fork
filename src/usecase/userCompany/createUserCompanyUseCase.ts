import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";
import { UserRepository } from "@/repository/userRepository";

export class CreateUserCompanyUseCase {
  constructor(
    private readonly userCompanyRepository: UserCompanyRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository
  ){}

  async execute(
    {userId, companyId}:
    {userId: string, companyId: string}
  ){
    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new BadRequestError("user does not exist")
    }
    
    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new BadRequestError("company does not exist")
    }

    const userCompanyExist = await this.userCompanyRepository.getByUserIdAndCompanyId({
      companyId, userId
    })
    if(userCompanyExist){
      throw new BadRequestError("userCompany already exist")
    }

    const userCompany = await this.userCompanyRepository.create({userId, companyId})

    return {userCompany}
  }
}