import { Module, Prisma } from "@prisma/client";

export interface ModuleRepository {
  getById(id: string): Promise<Module | null>
  create(data: Prisma.ModuleCreateInput): Promise<Module>
  list(
    {companyId, limit, page}:
    {companyId: string, limit: number, page: number}
  ): Promise<Module[]>
  
}