import { Prisma, UserRotation } from "@prisma/client";
import { UserRotationRepository } from "../userRotationRepository";
import { db } from "@/lib/prisma";

export class PrismaUserRotaionRepository implements UserRotationRepository {
  async create(data: Prisma.UserRotationCreateInput): Promise<UserRotation> {
    const userRotation = await db.userRotation.create({
      data
    })
    return userRotation
  }
  async getRotationByUserId(userId: string): Promise<UserRotation[]> {
        const rotations = await db.userRotation.findMany({
      where: {
        userId
      },
      include: {
        Rotation: true
      },
      orderBy: {
        createdAt: "asc"
      }
    })
    return rotations
  }
}