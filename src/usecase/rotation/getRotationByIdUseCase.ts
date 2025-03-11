import { BadRequestError } from "@/error/badRequest.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";

export class GetRotationByIdUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
  ){}

  async execute(rotationId: string){

    const rotation = await this.rotationRepository.getById(rotationId)

    return {rotation}
  }
}