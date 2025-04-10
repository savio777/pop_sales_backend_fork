import { NotFoundError } from "@/error/notfound.error";
import { TaskRepository } from "@/repository/taskRepository";

interface UpdateTask {
  title?: string;
  description?: string;
  status?: "COMPLETED" | "PENDING";
  finishedAt?: Date;
}

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ taskId, data }: { taskId: string; data: UpdateTask }) {
    const task = await this.taskRepository.getById(taskId);
    if (!task) {
      throw new NotFoundError("Tarefa não encontrada.");
    }

    const taskUpdated = await this.taskRepository.update({
      id: taskId,
      data,
    });

    return { task: taskUpdated };
  }
}
