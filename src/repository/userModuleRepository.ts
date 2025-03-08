import { UserModule } from "@prisma/client";

export interface UserModuleRepository {
  create(
    {userId, moduleId}:{userId: string, moduleId: string}
  ): Promise<UserModule>
  remove(
    {userId, moduleId}:{userId: string, moduleId: string}
  ): Promise<void>
}