import { BadRequestError } from "@/error/badRequest.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";

export class ListRotationByUserIdUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rotationRepository: RotationRepository
  ){}

  async execute(userId: string){
    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new BadRequestError("user does not exist")
    }

    const rotations = await this.rotationRepository.
  }
}