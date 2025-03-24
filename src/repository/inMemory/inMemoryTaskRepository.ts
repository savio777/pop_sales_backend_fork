import { Prisma, Task } from "@prisma/client";
import { TaskRepository } from "../taskRepository";
import { randomUUID } from "crypto";

export class InMemroyTaskRepository implements TaskRepository {
  private task: Task[] = []

  update({ id, data }: { id: string; data: Prisma.TaskUpdateInput; }): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const task: Task = {
      id: randomUUID(),
      createdAt: new Date(),
      description: data.description ?? null,
      finishedAt: null,
      status: "PENDING",
      stopId: (data as any).Stop?.connect?.id,
      title: data.title,
      updatedAt: new Date()
    }
    this.task.push(task)
    return task
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listByStopId({ limit, page, stopId }: { stopId: string; page: number; limit: number; }): Promise<Task[] | null> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }
  
}