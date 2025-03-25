import { Prisma, Stop } from "@prisma/client";
import { StopRepository } from "../stopRepository";
import { randomUUID } from "crypto";

export class InMemoryStopRepositoy implements StopRepository {
  private stops: Stop[] = []

  async create(data: Prisma.StopCreateInput): Promise<Stop> {
    const stop: Stop = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      rotationId: (data as any).Rotation?.connect?.id || null,
      ...data
    } as Stop;

    this.stops.push(stop);
    return stop;
  }

  async getById(id: string): Promise<Stop | null> {
    return this.stops.find(stop => stop.id === id) || null;
  }

  async getByRotationId(id: string): Promise<Stop[] | null> {
    const stops = this.stops.filter(stop => stop.rotationId === id);
    return stops.length ? stops : null;
  }

  async update({ id, data }: { id: string; data: Prisma.StopUpdateInput; }): Promise<Stop> {
    const index = this.stops.findIndex(stop => stop.id === id);
    if (index === -1) {
      throw new Error("Stop not found.");
    }

    this.stops[index] = {
      ...this.stops[index],
      ...data,
      updatedAt: new Date()
    } as Stop;

    return this.stops[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.stops.findIndex(stop => stop.id === id);
    if (index === -1) {
      throw new Error("Stop not found.");
    }

    this.stops.splice(index, 1);
  }
}
