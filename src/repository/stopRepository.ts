import { Prisma, StatusStop, Stop } from "@prisma/client";

export interface StopRepository {
  create(data: Prisma.StopCreateInput): Promise<Stop>
  getById(id: string): Promise<Stop | null>
  getByRotationId(id: string): Promise<Stop[] | null>
  update({id, data}:{id: string, data: Prisma.StopUpdateInput}): Promise<Stop>
  delete(id: string): Promise<void>
  listByRotationIdAndStatus(
    data:
    {rotationId: string, status: StatusStop}
  ): Promise<Stop[] | null>
}