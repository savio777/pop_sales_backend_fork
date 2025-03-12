import { Prisma, Task } from "@prisma/client";
import { TaskRepository } from "../taskRepository";
import { db } from "@/lib/prisma";

type TaskWithRelations = {
  id: string;
  title: string;
  description: string | null;
  finishedAt: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  company?: {
    id: string;
    name: string;
    status: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    status: string;
  };
  createdBy?: {
    id: string;
    name: string;
    status: string;
  };
  rotation?: {
    id: string;
    createdAt: Date;
    stops: {
      id: string;
      address: string;
      sequence: number;
    }[];
  };
};


export class PrismaTaskRepository implements TaskRepository {
  async getById(id: string): Promise<TaskWithRelations | null> {
    const task = await db.task.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        finishedAt: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        company: {
          select: {
            id: true,
            name: true,
            status: true
          }
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            status: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            status: true
          }
        },
        rotation: {
          select: {
            id: true,
            createdAt: true,
            stops: {
              select: {
                id: true,
                address: true,
                sequence: true
              }
            }
          }
        }
      }
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
  async listByUserAssigned(userAssignedId: string): Promise<Task[] | null> {
    const tasks = await db.task.findMany({
      where: {
        assignedToId: userAssignedId
      }
    });
    return tasks
  }
  async listByCompany(companyId: string): Promise<Task[] | null> {
    const tasks = await db.task.findMany({
      where: {
        companyId
      }
    });
    return tasks
  }
  async listByUserCreated(userCreatedId: string): Promise<Task[] | null> {
    const tasks = await db.task.findMany({
      where: {
        createdById: userCreatedId
      }
    });
    return tasks
  }
}