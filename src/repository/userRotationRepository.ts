import { UserRotation } from "@prisma/client";

export interface UserRotationRepository {
  getRotationByUserId(userId: string): Promise<UserRotation[]>
}