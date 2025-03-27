import { BadRequestError } from "@/error/badRequest.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { StopRepository } from "@/repository/stopRepository";
import { TaskRepository } from "@/repository/taskRepository";

export class DeleteRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly stopRepository: StopRepository,
    private readonly taskRepository: TaskRepository
  ){}

  async execute(
    {rotationId}:
    {rotationId: string}
  ){
    const rotation = await this.rotationRepository.getById(rotationId)
    if(!rotation){
      throw new BadRequestError("rotation does not exist")
    }

    // Deletat tasks
    const stops = await this.stopRepository.getByRotationId(rotation.id)
    if (stops?.length) {
      for (const stop of stops) {
        const tasks = await this.taskRepository.listByStopId({
          stopId: stop.id
        });
        
        if (tasks?.length) {
          await Promise.all(tasks.map(task => this.taskRepository.delete(task.id)));
        }
      }
    }
    
    // Deleta as paradas
    if(stops && stops.length > 0){
      await Promise.all(stops.map(stop =>  this.stopRepository.delete(stop.id)))
    }

    // Deleta a rotação
    await this.rotationRepository.delete(rotationId)
  }
}