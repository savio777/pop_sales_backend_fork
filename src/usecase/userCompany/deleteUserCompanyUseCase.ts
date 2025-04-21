import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";
import { UserRepository } from "@/repository/userRepository";

export class DeleteUserCompanyUseCase {
  constructor(
    private readonly userCompanyRepository: UserCompanyRepository,
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute({ userId, companyId }: { userId: string; companyId: string }) {
    const company = await this.companyRepository.getById(companyId);
    if (!company) {
      throw new NotFoundError("Empresa não encontrada.");
    }

    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado.");
    }

    const userCompanyExist =
      await this.userCompanyRepository.getByUserIdAndCompanyId({
        userId,
        companyId,
      });
    if (!userCompanyExist) {
      throw new NotFoundError("Relacionamento de usuário empresa não existe.");
    }

    const userCompany = await this.userCompanyRepository.delete(
      userCompanyExist.id
    );
    return { userCompany };
  }
}
