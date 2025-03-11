import { Prisma, Task } from "@prisma/client";
import { TaskRepository } from "../taskRepository";

export class PrismaTaskRepository implements TaskRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listByUserAssigned(userAssignedId: string): Promise<Task[] | null> {
    throw new Error("Method not implemented.");
  }
  listByCompany(companyId: string): Promise<Task[] | null> {
    throw new Error("Method not implemented.");
  }
  listByUserCreated(UserCreatedId: string): Promise<Task[] | null> {
    throw new Error("Method not implemented.");
  }
  
}