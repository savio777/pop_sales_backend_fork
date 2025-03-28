import { Prisma, UserRotation } from "@prisma/client";

export interface UserRotationRepository {
  getRotationByUserId(userId: string): Promise<UserRotation[]>
  create(data: Prisma.UserRotationCreateInput): Promise<UserRotation>
}