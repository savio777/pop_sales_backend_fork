import { Module, Prisma } from "@prisma/client";

export interface ModuleRepository {
  getById(): Promise<Module | null>
  create(data: Prisma.ModuleCreateInput): Promise<Module>
}