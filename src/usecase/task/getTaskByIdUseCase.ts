import { NotFoundError } from "@/error/notfound.error";
import { TaskRepository } from "@/repository/taskRepository";

export class GetTaskByIdUseCase {
  constructor(
    private readonly taskRepository: TaskRepository
  ){}

  async execute(taskId: string){
    const task = await this.taskRepository.getById(taskId)
    if(!task){
      throw new NotFoundError("Tarefa não encontrada.")
    }

    return {task}
  }
}