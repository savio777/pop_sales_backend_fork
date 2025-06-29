import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";

interface UpdateCompanySchema {
  id: string;
  name?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export class UpdateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({ id, name, status }: UpdateCompanySchema) {
    const companyExist = await this.companyRepository.getById(id);
    if (!companyExist) {
      throw new NotFoundError("Empresa não encontrada.");
    }

    if (name) {
      const companyNameExist = await this.companyRepository.findByName(name);
      if (companyNameExist) {
        throw new BadRequestError("Nome de empresa já cadastrado.");
      }
    }

    const company = await this.companyRepository.update({
      id,
      data: {
        ...(status && { status }),
        ...(name && { name }),
      },
    });

    return { company };
  }
}
