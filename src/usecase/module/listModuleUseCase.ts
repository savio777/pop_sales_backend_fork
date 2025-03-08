import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { ModuleRepository } from "@/repository/moduleRepository";

export class ListModuleUseCase {
  constructor(
    private readonly moduleRepository: ModuleRepository,
    private readonly companyRepository: CompanyRepository
  ){}
  async execute(
    {companyId, page, limit}:
    {companyId: string, page: number, limit: number}
  ){
    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new BadRequestError("company not exist")
    }
    
    const modules = await this.moduleRepository.list({companyId, limit, page})
    return {modules}
  }
}