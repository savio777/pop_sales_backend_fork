import { BadRequestError } from "@/error/badRequest.error";
import { UserRepository } from "@/repository/userRepository";
import { UserRotationRepository } from "@/repository/userRotationRepository";

export class ListRotationByUserIdUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRotationRepository: UserRotationRepository
  ){}

  async execute(userId: string){
    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new BadRequestError("user does not exist")
    }

    const rotations = await this.userRotationRepository.getRotationByUserId(userId)
    return {rotations}
  }
}