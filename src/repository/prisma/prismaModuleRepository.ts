import { Module, Prisma } from "@prisma/client";
import { ModuleRepository } from "../moduleRepository";
import { db } from "@/lib/prisma";

export class PrismaModuleRepository implements ModuleRepository {
  async list(
    { limit, page }: 
    { limit: number; page: number; }
  ): Promise<Module[]> {
    //TODO: aqui seria interessante filtrar por companyId para buscar apenas modulos de uma empresa especifica
    const modules = await db.module.findMany({ 
      take: limit,
      skip: (page - 1) * limit
    })
    return modules
  }
  async getById(id: string): Promise<Module | null> {
    const module = await db.module.findUnique({
      where: {
        id
      }
    })
    return  module
  }
  async create(data: Prisma.ModuleCreateInput): Promise<Module> {
    const module = await db.module.create({
      data
    })
    return module
  }
}