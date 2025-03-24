import { BadRequestError } from "@/error/badRequest.error";
import { StopRepository } from "@/repository/stopRepository";
import { TaskRepository } from "@/repository/taskRepository";

export class ListTaskByStopIdUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly stopRepository: StopRepository
  ) {}

  async execute(
    data:
    {stopId: string, page: number, limit: number}
  ) {
    const stop = await this.stopRepository.getById(data.stopId)
    if(!stop){
      throw new BadRequestError("stop does not exist")
    }
    const tasks = await this.taskRepository.listByStopId(data);
    return { tasks };
  }
}
