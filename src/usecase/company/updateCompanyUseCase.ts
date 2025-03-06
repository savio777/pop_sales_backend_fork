import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserRepository } from "@/repository/userRepository";

interface UpdateCompanySchema {
  id: string, 
  name?: string, 
  status?: "ACTIVE" | "INACTIVE",
  userId: string
}

export class UpdateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository
  ){}

  async execute(
    {id, name, userId, status}: UpdateCompanySchema
  ){
    const user = await this.userRepository.getById(userId)
    if (!user) {
      throw new NotFoundError("user not found with userId")
    }
    
    const company = await this.companyRepository.getById(id)
    if (!company) {
      throw new BadRequestError("company not exist")
    }

    if (company.userId !== userId) {
      throw new UnauthorizedError("you do not have permission to edit this company")
    }

    const companyUpdate = await this.companyRepository.update({
      id, 
      data: {
        ...(status && { status }),
        ...(name && { name })
      }
    })

    return { company: companyUpdate }
  }
}
