import { Prisma, Stop } from "@prisma/client";
import { RotationStopRepository } from "../stopRepository";
import { db } from "@/lib/prisma";

export class PrismaRotationStopRepository implements RotationStopRepository {
  async getByRotationId(id: string): Promise<Stop[] | null> {
    const rotationStop = await db.stop.findMany({
      where: {
        rotationId: id
      }
    })
    return rotationStop
  }
  async create(data: Prisma.StopCreateInput): Promise<Stop> {
    const rotationStop = await db.stop.create({
      data
    })
    return rotationStop
  }
  async getById(id: string): Promise<Stop | null> {
    const rotationStop = await db.stop.findUnique({
      where: {
        id
      }
    })
    return rotationStop
  }
  async update({id, data}:{id: string, data: Prisma.StopUpdateInput}): Promise<Stop> {
    const rotationStop = await db.stop.update({
      where: {
        id
      },
      data
    })
    return rotationStop
  }
  async delete(id: string): Promise<void> {
    await db.stop.delete({
      where: {
        id
      }
    })
  }
}