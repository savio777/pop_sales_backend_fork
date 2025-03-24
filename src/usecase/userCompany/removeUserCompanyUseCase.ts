import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";
import { UserRepository } from "@/repository/userRepository";

export class RemoveUserCompanyUseCase {
  constructor(
    private readonly userCompanyRepository: UserCompanyRepository,
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute({userId, companyId}: {userId: string, companyId: string}) {
    const company = await this.companyRepository.getById(companyId);
    if (!company) {
      throw new BadRequestError("company does not exist");
    }
  
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new BadRequestError("user does not exist");
    }
  
    const userCompanyExist = await this.userCompanyRepository.getByUserIdAndCompanyId({ userId, companyId });
    if (!userCompanyExist) {
      throw new NotFoundError("User-Company relationship does not exist");
    }
  
    await this.userCompanyRepository.remove(userCompanyExist.id);
  }
  
}
