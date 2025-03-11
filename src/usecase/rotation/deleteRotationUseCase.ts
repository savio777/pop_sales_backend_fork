import { BadRequestError } from "@/error/badRequest.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";

export class DeleteRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly userRepository: UserRepository
  ){}

  async execute({userId, rotationId}:{rotationId: string, userId: string}){
    const rotarion = await this.rotationRepository.getById(rotationId)
    if(!rotarion){
      throw new BadRequestError("rotation not exist")
    }

    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new BadRequestError("user not exist")
    } 

    if(rotarion.createdById !== userId){
      throw new UnauthorizedError("you not have permission to delete this") 
    }

    await this.rotationRepository.delete(rotationId)
  }
}