import { BadRequestError } from "@/error/badRequest.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { RotationStopRepository } from "@/repository/stopRepository";
import { TaskRepository } from "@/repository/taskRepository";
import { UserRepository } from "@/repository/userRepository";

export class DeleteRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly rotationStopRepository: RotationStopRepository,
    private readonly userRepository: UserRepository,
    private readonly taskRepository: TaskRepository
  ){}

  async execute({userId, rotationId}:{rotationId: string, userId: string}){
    const rotation = await this.rotationRepository.getById(rotationId)
    if(!rotation){
      throw new BadRequestError("rotation not exist")
    }

    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new BadRequestError("user not exist")
    } 

    if(rotation.createdById !== userId){
      throw new UnauthorizedError("you not have permission to delete this") 
    }

    const stops = await this.rotationStopRepository.getByRotationId(rotation.id)

    
    // Deletat tasks
    if (stops?.length) {
      for (const stop of stops) {
        const tasks = await this.taskRepository.listByRotationStopId(stop.id);
        
        if (tasks?.length) {
          await Promise.all(tasks.map(task => this.taskRepository.delete(task.id)));
        }
      }
    }
    
    // Deleta as paradas
    if(stops && stops.length > 0){
      await Promise.all(stops.map(stop =>  this.rotationStopRepository.delete(stop.id)))
    }

    // Deleta a rotação
    await this.rotationRepository.delete(rotationId)
  }
}