import { NotFoundError } from "@/error/notfound.error";
import { RotationRepository } from "@/repository/rotationRepository";

export class GetRotationByIdUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
  ){}

  async execute(rotationId: string){

    const rotation = await this.rotationRepository.getById(rotationId)
    if(!rotation){
      throw new NotFoundError("Rotação não encontrada.")
    }

    return {rotation}
  }
}