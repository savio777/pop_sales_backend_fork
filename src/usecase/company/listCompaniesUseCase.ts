import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserRepository } from "@/repository/userRepository";

export class ListCompaniesUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(
    {userId, limit, page}:
    {userId: string, limit: number, page: number}
  ){
    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new NotFoundError("user not found")
    }

    const companies = await this.companyRepository.list({
      userId, 
      limit, 
      page
    })
    
    return {companies}
  }
}