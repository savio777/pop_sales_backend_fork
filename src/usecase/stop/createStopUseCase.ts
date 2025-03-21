import { BadRequestError } from "@/error/badRequest.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { StopRepository } from "@/repository/stopRepository";

interface RotationsStops {
  sequence: number
  address: string
}

export class CreateStopUseCase {
  constructor(
    private readonly stopRepository: StopRepository,
    private readonly rotationRepository: RotationRepository
  ){}

  async execute(
    {stop, rotationId}:{ stop: RotationsStops, rotationId: string}
  ){

    const rotation = await this.rotationRepository.getById(rotationId)
    if(!rotation){
      throw new BadRequestError("rotation not exist")
    }

    let stopCreateds = await this.stopRepository.create({
      address: stop.address,
      sequence: stop.sequence,
    })
    
    return {stop: stopCreateds}
  }
}