import { NotFoundError } from "@/error/notfound.error";
import { TaskRepository } from "@/repository/taskRepository";

interface UpdateTask {
  title?: string;
  description?: string | null;
  status?: "COMPLETED" | "PENDING";
  finishedAt?: Date | null;
}

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ taskId, data }: { taskId: string; data: UpdateTask }) {
    const taskExists = await this.taskRepository.getById(taskId);
    if (!taskExists) {
      throw new NotFoundError("Tarefa não encontrada.");
    }

    const task = await this.taskRepository.update({
      id: taskId,
      data,
    });

    return { task };
  }
}
