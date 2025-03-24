import { Prisma, Task } from "@prisma/client";
import { TaskRepository } from "../taskRepository";
import { randomUUID } from "crypto";

export class InMemroyTaskRepository implements TaskRepository {
  private task: Task[] = []

  async update({ id, data }: { id: string; data: Prisma.TaskUpdateInput }): Promise<Task> {
    const index = this.task.findIndex(e => e.id === id);
    
    if (index === -1) {
      throw new Error("Task not found.");
    }
  
    const updatedTask: Task = {
      ...this.task[index],
      updatedAt: new Date(),
      description: typeof data.description === "string" ? data.description : this.task[index].description,
      title: typeof data.title === "string" ? data.title : this.task[index].title,
      status: typeof data.status === "string" ? data.status : this.task[index].status,
      finishedAt: data.finishedAt 
      ? new Date(data.finishedAt as string)
      : null    };
  
    this.task[index] = updatedTask;
    
    return updatedTask
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
  async delete(id: string): Promise<void> {
    const index = this.task.findIndex(e => e.id === id)
    if(index === -1){
      throw new Error("task not found")
    }
    this.task.slice(index, 1)
  }
  async listByStopId({ limit, page, stopId }: { stopId: string; page: number; limit: number; }): Promise<Task[] | null> {
    const startIndex = (page -1) * limit
    const endIndex = startIndex + limit
    
    const tasks = this.task.filter(e => e.stopId === stopId)
    return tasks.slice(startIndex, endIndex)
  }
  async getById(id: string): Promise<Task | null> {
    const task = this.task.find(e => e.id === id)
    return task || null
  }
  
}