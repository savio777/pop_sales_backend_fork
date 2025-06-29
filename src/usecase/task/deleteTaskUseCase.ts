import { NotFoundError } from "@/error/notfound.error";
import { TaskRepository } from "@/repository/taskRepository";

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(taskId: string) {
    const taskExist = await this.taskRepository.getById(taskId);
    if (!taskExist) {
      throw new NotFoundError("Tarefa não encontrada.");
    }
    const task = await this.taskRepository.delete(taskId);
    return { task };
  }
}
