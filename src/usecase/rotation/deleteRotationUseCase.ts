import { BadRequestError } from "@/error/badRequest.error";
import { RotationRepository } from "@/repository/rotationRepository";

export class DeleteRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository
  ){}

  async execute(rotationId: string){
    const rotarion = await this.rotationRepository.getById(rotationId)
    if(!rotarion){
      throw new BadRequestError("rotation not exist")
    }

    await this.rotationRepository.delete(rotationId)
  }
}