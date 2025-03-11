import { BadRequestError } from "@/error/badRequest.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";

export class ListByCreatedIdUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly userRepository: UserRepository
  ){}

  async execute(createdById: string){
    const user = await this.userRepository.getById(createdById)
    if(!user){
      throw new BadRequestError("user created not exist")
    }

    const rotation = await this.rotationRepository.listByCreatedById(createdById)

    return {rotation}
  }
}