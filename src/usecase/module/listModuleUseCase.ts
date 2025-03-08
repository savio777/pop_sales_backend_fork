import { ModuleRepository } from "@/repository/moduleRepository";

export class ListModuleUseCase {
  constructor(
    private readonly moduleRepository: ModuleRepository
  ){}
  async execute(
    {page, limit}:
    {page: number, limit: number}
  ){
    const modules = await this.moduleRepository.list({limit, page})
    return {modules}
  }
}