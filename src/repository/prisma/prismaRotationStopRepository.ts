import { Prisma, RotationStop } from "@prisma/client";
import { RotationStopRepository } from "../rotationStopRepository";
import { db } from "@/lib/prisma";

export class PrismaRotationStopRepository implements RotationStopRepository {
  async getByRotationId(id: string): Promise<RotationStop[] | null> {
    const rotationStop = await db.rotationStop.findMany({
      where: {
        rotationId: id
      }
    })
    return rotationStop
  }
  async create(data: Prisma.RotationStopCreateInput): Promise<RotationStop> {
    const rotationStop = await db.rotationStop.create({
      data
    })
    return rotationStop
  }
  async getById(id: string): Promise<RotationStop | null> {
    const rotationStop = await db.rotationStop.findUnique({
      where: {
        id
      }
    })
    return rotationStop
  }
  async update({id, data}:{id: string, data: Prisma.RotationStopUpdateInput}): Promise<RotationStop> {
    const rotationStop = await db.rotationStop.update({
      where: {
        id
      },
      data
    })
    return rotationStop
  }
  async delete(id: string): Promise<void> {
    await db.rotationStop.delete({
      where: {
        id
      }
    })
  }
}