import { ConflictError } from "@/error/conflict.error";
import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";
import { UserRepository } from "@/repository/userRepository";

interface SignUpInputs {
  name: string;
  phone?: string;
  email: string;
  password: string;
  companyId: string;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userCompanyRepository: UserCompanyRepository
  ) {}

  async execute(data: SignUpInputs) {
    const company = await this.companyRepository.getById(data.companyId);
    if (!company) {
      throw new NotFoundError("Empresa não encontrada.");
    }

    const userWithEmailAlredyExist = await this.userRepository.getByEmail(
      data.email
    );
    if (userWithEmailAlredyExist) {
      throw new ConflictError(
        "Já existe um usuário cadastrado com este email."
      );
    }

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    });

    await this.userCompanyRepository.create({
      companyId: data.companyId,
      userId: user.id,
    });

    return { user };
  }
}
