import { Prisma, StatusStop, Stop } from "@prisma/client";
import { StopRepository } from "../stopRepository";
import { db } from "@/lib/prisma";

export class PrismaStopRepository implements StopRepository {
  async listByRotationIdAndStatus(
    data: 
    { rotationId: string; status: StatusStop; }
  ): Promise<Stop[] | null> {
    const stop = await db.stop.findMany({
      where: {
        rotationId: data.rotationId,
        status: data.status
      }
    })
    return stop
  }
  async getByRotationId(id: string): Promise<Stop[] | null> {
    const stop = await db.stop.findMany({
      where: {
        rotationId: id
      }
    })
    return stop
  }
  async create(data: Prisma.StopCreateInput): Promise<Stop> {
    const stop = await db.stop.create({
      data
    })
    return stop
  }
  async getById(id: string): Promise<Stop | null> {
    const stop = await db.stop.findUnique({
      where: {
        id
      }
    })
    return stop
  }
  async update({id, data}:{id: string, data: Prisma.StopUpdateInput}): Promise<Stop> {
    const stop = await db.stop.update({
      where: {
        id
      },
      data
    })
    return stop
  }
  async delete(id: string): Promise<void> {
    await db.stop.delete({
      where: {
        id
      }
    })
  }
}