import { StopRepository } from "@/repository/stopRepository";

export class ListStopByRotationIdUseCase {
  constructor(
    private readonly rotationStopRepository: StopRepository
  ){}

  async execute(rotationId: string){
    const rotationsStop = await this.rotationStopRepository.getByRotationId(rotationId)
    return {rotationsStop}
  }
}