import { BadRequestError } from "@/error/badRequest.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";

export class ListByAssignedRoIdUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly userRepository: UserRepository
  ){}

  async execute(assignedToId: string){
    const user = await this.userRepository.getById(assignedToId)
    if(!user){
      throw new BadRequestError("user assigned not exist")
    }

    const rotation = await this.rotationRepository.listByAssignedToId(assignedToId)

    return {rotation}
  }
}