import { TaskRepository } from "@/repository/taskRepository";

export class DeleteTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository
  ){}

  async execute(taskId: string){
    const task = await this.taskRepository.
    await this.taskRepository.delete(taskId)
  }
}