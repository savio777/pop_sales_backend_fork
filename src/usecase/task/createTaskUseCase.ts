import { NotFoundError } from "@/error/notfound.error";
import { StopRepository } from "@/repository/stopRepository";
import { TaskRepository } from "@/repository/taskRepository";

interface CreateTaskSchema {
  title: string, 
  description?: string, 
  stopId: string, 
}

export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly stopRepository: StopRepository
  ){}

  async execute(
    {title, description, stopId}:CreateTaskSchema
  ){    
    const stop = await this.stopRepository.getById(stopId)
    if(!stop){
      throw new NotFoundError("Parada não encontrada.")
    }

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