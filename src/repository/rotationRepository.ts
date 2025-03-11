import { Prisma, Rotation } from "@prisma/client";

export interface RotationRepository {
  create(data: Prisma.RotationCreateInput): Promise<Rotation>
  listByCreatedById(createdById: string): Promise<Rotation[] | null>
  listByAssignedToId(assignedToId: string): Promise<Rotation[] | null>
  update(data: Prisma.RotationUpdateInput): Promise<Rotation>
  delete(id: string): Promise<void>
}