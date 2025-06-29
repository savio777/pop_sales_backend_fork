import { Prisma, Rotation } from "@prisma/client";
import { RotationRepository } from "../rotationRepository";
import { db } from "@/lib/prisma";

export class PrismaRotationRepository implements RotationRepository {
  async create(data: Prisma.RotationCreateInput): Promise<Rotation> {
    const rotation = await db.rotation.create({
      data
    })
    return rotation
  }
  async getById(id: string): Promise<Rotation | null> {
    const rotation = await db.rotation.findUnique({
      where: {
        id
      }
    })
    return rotation
  }
  async update({id, data}:{id: string, data: Prisma.RotationUpdateInput}): Promise<Rotation> {
    const rotation = await db.rotation.update({
      where: {
        id
      },
      data
    })
    return rotation
  }
  async delete(id: string): Promise<void> {
    await db.rotation.delete({
      where: {
        id
      }
    })
  }
} 