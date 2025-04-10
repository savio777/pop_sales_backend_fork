import { NotFoundError } from "@/error/notfound.error";
import { TaskRepository } from "@/repository/taskRepository";

export class DeleteTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository
  ){}

  async execute(taskId: string){
    const task = await this.taskRepository.getById(taskId)
    if(!task){
      throw new NotFoundError("Tarefa não encontrada.")
    }
    await this.taskRepository.delete(taskId)
  }
}