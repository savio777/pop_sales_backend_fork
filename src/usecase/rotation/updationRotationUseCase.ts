import { BadRequestError } from "@/error/badRequest.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";

export class UpdateRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly userRepository: UserRepository,
  ){}

  async execute(
    {assignedToId, createdById, id}:
    {createdById: string, assignedToId: string, id: string}
  ){
    const userCreated = await this.userRepository.getById(createdById)
    if(!userCreated){
      throw new BadRequestError("user created does not exist")
    }

    const userAssigned = await this.userRepository.getById(assignedToId)
    if(!userAssigned){
      throw new BadRequestError("user assigned does not exist")
    }

    const rotation = await this.rotationRepository.getById(id)
    if(!rotation){
      throw new BadRequestError("rotation does not exist")
    }

    if(rotation.createdById !== createdById){
      throw new UnauthorizedError("you do not have permission to update this")
    }

    const rotationUpdated = await this.rotationRepository.update({
      id,
      data: {
        assignedTo: {
          connect: {
            id: assignedToId
          }
        }
      }
    })

    return {rotation: rotationUpdated}
  }
}