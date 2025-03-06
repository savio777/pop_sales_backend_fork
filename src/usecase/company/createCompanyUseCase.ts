import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserRepository } from "@/repository/userRepository";

interface CreateCompanySchema {
  name: string;
  userId: string;
}

export class CreateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute({ name, userId }: CreateCompanySchema) {
    const companyAlreadyExist = await this.companyRepository.findByName(name);
    if (companyAlreadyExist) {
      throw new BadRequestError("Company with name already exist");
    }

    const user = await this.userRepository.getById(userId);
    

    const company = await this.companyRepository.create({
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    });

    return { company };
  }
}
