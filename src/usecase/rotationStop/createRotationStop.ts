import { BadRequestError } from "@/error/badRequest.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { RotationStopRepository } from "@/repository/rotationStopRepository";

interface RotationsStops {
  sequence: number
  address: string
}

export class CreateRotationStopUseCase {
  constructor(
    private readonly rotationStopRepository: RotationStopRepository,
    private readonly rotationRepository: RotationRepository
  ){}

  async execute(
    {stop, rotationId}:{ stop: RotationsStops, rotationId: string}
  ){

    const rotation = await this.rotationRepository.getById(rotationId)
    if(!rotation){
      throw new BadRequestError("rotation not exist")
    }

    let stopCreateds = await this.rotationStopRepository.create({
      address: stop.address,
      sequence: stop.sequence,
      Rotation: {
        connect: {
          id: rotationId
        }
      }
    })
    
    return {stop: stopCreateds}
  }
}