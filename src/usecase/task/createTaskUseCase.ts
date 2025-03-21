import { TaskRepository } from "@/repository/taskRepository";

interface CreateTaskSchema {
  title: string, 
  description?: string, 
  stopId: string, 
}

export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ){}

  async execute(
    {title, description, stopId}:CreateTaskSchema
  ){    

    const task = await this.taskRepository.create({
      title,
      description,
      Stop: {
        connect: {
          id: stopId
        }
      }
    })

    return {task}
  }
}