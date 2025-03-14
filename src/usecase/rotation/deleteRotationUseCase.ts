import { BadRequestError } from "@/error/badRequest.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { RotationStopRepository } from "@/repository/rotationStopRepository";
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

    // Deletar as tasks
    const tasks = await this.taskRepository.

    // Deleta as paradas relacionadas a esta rotação
    const stops = await this.rotationStopRepository.getByRotationId(rotation.id)
    if(stops){
      for(let stop of stops){
        await this.rotationStopRepository.delete(stop.id)
      }
    }

    // Deleta a rotação
    await this.rotationRepository.delete(rotationId)
  }
}