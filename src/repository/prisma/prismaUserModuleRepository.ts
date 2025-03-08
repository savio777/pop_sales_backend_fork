import { UserModule } from "@prisma/client";
import { UserModuleRepository } from "../userModuleRepository";
import { db } from "@/lib/prisma";

export class PrismaUserModuleRepository implements UserModuleRepository {
  async list({ userId, limit, page }: { userId: string; limit: number; page: number; }): Promise<UserModule[]> {
    const userModules = await db.userModule.findMany({
      where: {
        userId
      },
      take: limit,
      skip: (page - 1) * limit
    })
    return userModules
  }
  async create({ userId, moduleId }: { userId: string; moduleId: string; }): Promise<UserModule> {
    const module = await db.userModule.create({
      data: {
        userId,
        moduleId
      }
    })
    return module
  }
  async remove({ userId, moduleId }: { userId: string; moduleId: string }): Promise<void> {
    await db.userModule.delete({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        }
      }
    });
  }
}