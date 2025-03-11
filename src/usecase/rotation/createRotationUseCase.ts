import { BadRequestError } from "@/error/badRequest.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";

export class CreateRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly userRepository: UserRepository
  ){}

  async execute({assignedToId, createdById}:{createdById: string, assignedToId: string}){
    const user = await this.userRepository.getById(createdById)
    if(!user){
      throw new BadRequestError("user not exist")
    }

    const rotation = await this.rotationRepository.create({
      createdBy: {connect: {id: createdById }},
      assignedTo: {connect: {id: assignedToId }},
    })

    return {rotation}
  }
}