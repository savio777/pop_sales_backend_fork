import { Prisma, Task } from "@prisma/client";

interface GetTaskById {
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

interface listTask {
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
}

export interface TaskRepository {
  update(
    {id, data}:
    {id: string, data: Prisma.TaskUpdateInput}
  ): Promise<Task>
  create(data: Prisma.TaskCreateInput): Promise<Task>
  delete(id: string): Promise<void>
  listByUserAssigned(userAssignedId: string): Promise<Task[] | null>
  listByCompany(companyId: string): Promise<Task[] | null>
  listByUserCreated(userCreatedId: string): Promise<Task[] | null>
  getById(id: string): Promise<GetTaskById | null>
  listTask(
    {
      limit, 
      page, 
      companyId, 
      createdAt, 
      finishedAt, 
      status, 
      userAssignedId, 
      userCreatedId
    }:
    {
      limit: number,
      page: number,
      userCreatedId?: string,
      userAssignedId?: string,
      companyId?: string,
      status?: "COMPLETED" | "PENDING",
      createdAt?: Date,
      finishedAt?: Date,
    }
  ): Promise<listTask[] | null>
}