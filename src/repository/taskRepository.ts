import { Prisma, Task } from "@prisma/client";

export interface TaskRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task>
  delete(id: string): Promise<void>
  listByUserAssigned(userAssignedId: string): Promise<Task[] | null>
  listByCompany(companyId: string): Promise<Task[] | null>
  listByUserCreated(userCreatedId: string): Promise<Task[] | null>
}