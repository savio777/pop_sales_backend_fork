import { Prisma, Task } from "@prisma/client";
import { TaskRepository } from "../taskRepository";

export class InMemroyTaskRepository implements TaskRepository {
  update({ id, data }: { id: string; data: Prisma.TaskUpdateInput; }): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  create(data: Prisma.TaskCreateInput): Promise<Task> {
    throw new Error("Method not implemented.");
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