import { NotFoundError } from "@/error/notfound.error";
import { RotationRepository } from "@/repository/rotationRepository";

interface UpdateRotation {
  description?: string
}

export class UpdateRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
  ){}

  async execute(
    {id, data}:
    {id: string, data: UpdateRotation}
  ){
    const rotation = await this.rotationRepository.getById(id)
    if(!rotation){
      throw new NotFoundError("Rotação não encontrada.")
    }
    
    const rotationUpdated = await this.rotationRepository.update({
      id, 
      data
    })
    
    return {rotation: rotationUpdated}
  }
}