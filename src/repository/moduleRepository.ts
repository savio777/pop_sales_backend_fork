import { Module, Prisma } from "@prisma/client";

export interface ModuleRepository {
  getById(id: string): Promise<Module | null>
  create(data: Prisma.ModuleCreateInput): Promise<Module>
}