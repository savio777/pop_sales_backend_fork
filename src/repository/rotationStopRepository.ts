import { Prisma, Stop } from "@prisma/client";

export interface RotationStopRepository {
  create(data: Prisma.StopCreateInput): Promise<Stop>
  getById(id: string): Promise<Stop | null>
  getByRotationId(id: string): Promise<Stop[] | null>
  update({id, data}:{id: string, data: Prisma.StopUpdateInput}): Promise<Stop>
  delete(id: string): Promise<void>
}