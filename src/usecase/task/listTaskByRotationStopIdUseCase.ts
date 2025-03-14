import { TaskRepository } from "@/repository/taskRepository";

export class ListTaskByRotationStopIdUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(rotationStopId: string) {
    const tasks = await this.taskRepository.listByRotationStopId(rotationStopId);
    return { tasks };
  }
}
