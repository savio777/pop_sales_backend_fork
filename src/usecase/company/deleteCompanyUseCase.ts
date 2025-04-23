import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";

export class DeleteCompanyUseCase {
  constructor(private readonly companyRepositoy: CompanyRepository) {}

  async execute(id: string) {
    const comapanyExist = await this.companyRepositoy.getById(id);
    if (!comapanyExist) {
      throw new NotFoundError("Empresa não existe.");
    }

    const company = await this.companyRepositoy.delete(id);
    return { company };
  }
}
