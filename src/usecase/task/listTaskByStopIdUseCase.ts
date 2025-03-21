import { TaskRepository } from "@/repository/taskRepository";

export class ListTaskByStopIdUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(
    data:
    {stopId: string, page: number, limit: number}
  ) {
    const tasks = await this.taskRepository.listByStopId(data);
    return { tasks };
  }
}
