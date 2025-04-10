import { Prisma, Task } from "@prisma/client";
import { TaskRepository } from "../taskRepository";
import { db } from "@/lib/prisma";


export class PrismaTaskRepository implements TaskRepository {
  async listByStopId(
    { limit, page, stopId }: { stopId: string; page: number; limit: number }
  ): Promise<Task[] | null> {
    const task = await db.task.findMany({
      where: { stopId },
      skip: limit && page ? (page - 1) * limit : undefined,
      take: limit || undefined,
    });
  
    return task;
  }

  async update(
    {id, data}:
    {id: string, data: Prisma.TaskUpdateInput}
  ): Promise<Task> {
    const task = await db.task.update({
      where: {
        id
      },
      data
    })
    return task
  }

  async getById(id: string): Promise<Task | null> {
    const task = await db.task.findUnique({
      where: { id },
    });
  
    return task;
  }
  
  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const task = await db.task.create({
      data
    });
    return task
  }

  async delete(id: string): Promise<void> {
    await db.task.delete({
      where: {
        id
      }
    });
    
  }
}