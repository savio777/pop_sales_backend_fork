import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";

export class FindCompanyByNameUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(name: string) {
    const company = await this.companyRepository.findByName(name);
    if (!company) {
      throw new NotFoundError("Não existe empresa cadastrada com este nome.");
    }

    return { company };
  }
}
