import { Prisma, Task } from "@prisma/client";



export interface TaskRepository {
  update(
    {id, data}:
    {id: string, data: Prisma.TaskUpdateInput}
  ): Promise<Task>
  create(data: Prisma.TaskCreateInput): Promise<Task>
  delete(id: string): Promise<void>
  listByStopId(stopyId: string): Promise<Task[] | null>
  getById(id: string): Promise<Task | null>
}