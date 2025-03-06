import { BadRequestError } from "@/error/badRequest.error";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";

export class RemoveUserCompanyUseCase {
  constructor(
    private readonly userCompanyRepository: UserCompanyRepository,
  ){}

  async execute(
    {userId, companyId}:
    {userId: string, companyId: string}
  ){

    const userCompanyExist = await this.userCompanyRepository.getByUserIdAndCompanyId({
      userId, companyId
    })

    if(!userCompanyExist){
      throw new BadRequestError("user company not exist")
    }

    await this.userCompanyRepository.remove(userCompanyExist.id)

  }
}