import { Prisma, Rotation } from "@prisma/client";
import { RotationRepository } from "../rotationRepository";
import { randomUUID } from "crypto";

export class InMemoryRotationRepository implements RotationRepository {
  private rotation: Rotation[] = []

  async create(companyId: string): Promise<Rotation> {
    const rotation: Rotation = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      companyId
    }

    this.rotation.push(rotation)
    return rotation
  }
  getById(id: string): Promise<Rotation | null> {
    throw new Error("Method not implemented.");
  }
  update({ id, data }: { id: string; data: Prisma.RotationUpdateInput; }): Promise<Rotation> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}