import { Prisma, RotationStop } from "@prisma/client";

export interface RotationStopRepository {
  create(data: Prisma.RotationStopCreateInput): Promise<RotationStop>
  getById(id: string): Promise<RotationStop | null>
  getByRotationId(id: string): Promise<RotationStop[] | null>
  update({id, data}:{id: string, data: Prisma.RotationStopUpdateInput}): Promise<RotationStop>
  delete(id: string): Promise<void>
}