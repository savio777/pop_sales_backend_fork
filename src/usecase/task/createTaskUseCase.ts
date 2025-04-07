import { BadRequestError } from "@/error/badRequest.error";
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

    if(stop.status === "COMPLETED"){
      throw new BadRequestError("Esta parada já foi concluída, não foi possivel atribuir uma nova tarefa.")
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