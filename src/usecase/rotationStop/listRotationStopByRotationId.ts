import { RotationStopRepository } from "@/repository/rotationStopRepository";

export class ListRotationStopByRotationId {
  constructor(
    private readonly rotationStopRepository: RotationStopRepository
  ){}

  async execute(rotationId: string){
    const rotationsStop = await this.rotationStopRepository.getByRotationId(rotationId)
    return {rotationsStop}
  }
}