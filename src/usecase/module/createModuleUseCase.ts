import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { ModuleRepository } from "@/repository/moduleRepository";

export class CreateModuleUseCase {
  constructor(
    private readonly moduleRepository: ModuleRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(
    {name, companyId}:
    {companyId: string, name: string}
  ){
    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new BadRequestError("company not exist")
    }

    const module = await this.moduleRepository.create({
      name,
      Company: {
        connect: {
          id: companyId
        }
      }
    }) 

    return {module}
  }
}