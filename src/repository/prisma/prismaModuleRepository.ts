import { Module, Prisma } from "@prisma/client";
import { ModuleRepository } from "../moduleRepository";
import { db } from "@/lib/prisma";

export class PrismaModuleRepository implements ModuleRepository {
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