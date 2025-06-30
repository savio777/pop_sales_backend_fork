import { PrismaClient, UserPermission } from "@prisma/client";

export class PrismaUserPermissionRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(userId: string, permissionId: string): Promise<UserPermission> {
    return this.prisma.userPermission.create({
      data: {
        userId,
        permissionId,
      },
    });
  }

  async findPermissionByName(name: string) {
    return this.prisma.permission.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });
  }
}
