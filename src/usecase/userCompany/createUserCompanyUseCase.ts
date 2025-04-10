import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
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
      throw new NotFoundError("Usuário não encontrado.")
    }
    
    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new NotFoundError("Empresa não encontrada.")
    }

    const userCompanyExist = await this.userCompanyRepository.getByUserIdAndCompanyId({
      companyId, userId
    })
    if(userCompanyExist){
      throw new BadRequestError("Usuário empresa já existe.")
    }

    const userCompany = await this.userCompanyRepository.create({userId, companyId})

    return {userCompany}
  }
}