import { Prisma, RotationStop } from "@prisma/client";
import { RotationStopRepository } from "../rotationStopRepository";
import { db } from "@/lib/prisma";

export class PrismaRotationStopRepository implements RotationStopRepository {
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
  async update(data: Prisma.RotationStopUpdateInput): Promise<RotationStop> {
    const rotationStop = await db.rotationStop.update({
      where: {
        id
      },
      data
    })
    return rotationStop
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}