import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";

interface UpdateCompanySchema {
  id: string, 
  name?: string, 
  status?: "ACTIVE" | "INACTIVE",
}

export class UpdateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
  ){}

  async execute(
    {id, name, status}: UpdateCompanySchema
  ){

    const company = await this.companyRepository.getById(id)
    if (!company) {
      throw new NotFoundError("Empresa não existe.")
    }

    const companyUpdate = await this.companyRepository.update({
      id, 
      data: {
        ...(status && { status }),
        ...(name && { name })
      }
    })

    return { company: companyUpdate }
  }
}
