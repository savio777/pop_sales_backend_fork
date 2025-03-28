import { UserRotation } from "@prisma/client";
import { UserRotationRepository } from "../userRotationRepository";
import { db } from "@/lib/prisma";

export class PrismaUserRotaionRepository implements UserRotationRepository {
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