import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";

interface CreateCompanySchema {
  name: string;
}

export class CreateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(data: CreateCompanySchema) {
    const companyAlreadyExist = await this.companyRepository.findByName(data.name);
    if (companyAlreadyExist) {
      throw new BadRequestError("Já existe uma empresa cadastrada com este nome.");
    }

    const company = await this.companyRepository.create(data);

    return { company };
  }
}
