import { Prisma, Rotation } from "@prisma/client";

export interface RotationRepository {
  create(data: Prisma.RotationCreateInput): Promise<Rotation>
  getById(id: string): Promise<Rotation | null>
  update({id, data}:{id: string, data: Prisma.RotationUpdateInput}): Promise<Rotation>
  delete(id: string): Promise<void>
}