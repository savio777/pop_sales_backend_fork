import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
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
    if(!user){
      throw new NotFoundError("user not found")
    }
    
    const company = await this.companyRepository.create({
      name,
      owner: {
        connect: {
          id: userId
        }
      }
    });

    return { company };
  }
}
