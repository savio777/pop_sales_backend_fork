import { Prisma, Rotation } from "@prisma/client";
import { RotationRepository } from "../rotationRepository";
import { db } from "@/lib/prisma";

export class PrismaRotationRepository implements RotationRepository {
  async create(data: Prisma.RotationCreateInput): Promise<Rotation> {
    const rotation = await db.rotation.create({
      data
    })
    return rotation
  }
  async getById(id: string): Promise<Rotation | null> {
    const rotation = await db.rotation.findUnique({
      where: {
        id
      }
    })
    return rotation
  }
  async listByCreatedById(createdById: string): Promise<Rotation[] | null> {
    const rotations = await db.rotation.findMany({
      where: {
        createdById
      }
    })
    return rotations
  }
  async listByAssignedToId(assignedToId: string): Promise<Rotation[] | null> {
    const rotation = await db.rotation.findMany({
      where: {
        assignedToId
      }
    })
    return rotation
  }
  async update(data: Prisma.RotationUpdateInput): Promise<Rotation> {
    
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
} 