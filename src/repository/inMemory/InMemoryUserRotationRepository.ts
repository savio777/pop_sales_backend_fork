import { UserRotation, Prisma } from "@prisma/client";
import { UserRotationRepository } from "../userRotationRepository";
import { randomUUID } from "crypto";

export class InMemoryUserRotationRepository implements UserRotationRepository {
  private userRotation: UserRotation[] = []

  async getRotationByUserId(userId: string): Promise<UserRotation[] | null> {
    const userRotation = this.userRotation.filter(e => e.userId === userId)
    return userRotation
  }

  async create(data: Prisma.UserRotationCreateInput): Promise<UserRotation> {
    const userRotation: UserRotation = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      rotationId: data.Rotation?.connect?.id!,
      userId: data.User?.connect?.id!,
    }

    this.userRotation.push(userRotation)
    return userRotation
  }
  
}