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
  async getById(id: string): Promise<Rotation | null> {
    const rotation = this.rotation.find(i => i.id === id)
    return rotation || null
  }
  async update({ id, data }: { id: string; data: Prisma.RotationUpdateInput; }): Promise<Rotation> {
    const index = this.rotation.findIndex(i => i.id === id);
    if (index === -1) {
      throw new Error("Rotation not found.");
    }

    this.rotation[index] = {
      ...this.rotation[index],
      ...data,
      updatedAt: new Date()
    } as Rotation;

    return this.rotation[index];
  }
  async delete(id: string): Promise<void> {
    const index = this.rotation.findIndex(i => i.id === id)

    if (index === -1) {
      throw new Error("Rotation not found.");
    }

    this.rotation.splice(index, 1); 
  }

}