import { NotFoundError } from "@/error/notfound.error";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";
import { UserRepository } from "@/repository/userRepository";

interface UpdateUserInputs {
  name?: string;
  phone?: string;
  email?: string;
  status?: "ACTIVE" | "INACTIVE";
  companyId?: string;
}

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userCompanyRepository: UserCompanyRepository
  ) {}

  async execute({ userId, data }: { userId: string; data: UpdateUserInputs }) {
    const userExists = await this.userRepository.getById(userId);
    if (!userExists) {
      throw new NotFoundError("Usuário não encontrado.");
    }

    const user = await this.userRepository.update({
      id: userId,
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        status: data.status,
      },
    });

    let userCompanyList = await this.userCompanyRepository.listByIdUser({
      userId,
      limit: 100,
      page: 1,
    });

    let userCompany = null;

    if (data.companyId && userCompanyList.length) {
      //  deletar sempre o valor anterior e deixar somente ligação com a nova empresa
      const deletedUserCompany = await this.userCompanyRepository.delete(
        userCompanyList[0].id
      );

      if (deletedUserCompany) {
        userCompany = await this.userCompanyRepository.create({
          companyId: data.companyId,
          userId,
        });
      }
    }

    if (data.companyId && !userCompanyList.length) {
      userCompany = await this.userCompanyRepository.create({
        companyId: data.companyId,
        userId,
      });
    }

    const { password, ...userWithoutPassword } = user!;
    return { user: userWithoutPassword, userCompany };
  }
}
