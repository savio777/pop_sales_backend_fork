import { BadRequestError } from "@/error/badRequest.error";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";

export class RemoveUserCompanyUseCase {
  constructor(
    private readonly userCompanyRepository: UserCompanyRepository,

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