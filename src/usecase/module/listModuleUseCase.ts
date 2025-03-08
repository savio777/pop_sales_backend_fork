import { PrismaModuleRepository } from "@/repository/prisma/prismaModuleRepository";

export class ListModuleUseCase {
  async execute(
    {page, limit}:
    {page: number, limit: number}
  ){
    const moduleRepository = new PrismaModuleRepository()
    const modules = await moduleRepository.list({limit, page})
    return {modules}
  }
}