import { BadRequestError } from "@/error/badRequest.error";
import { ClientRepository } from "@/repository/clientRepository";
import { RotationRepository } from "@/repository/rotationRepository";
import { StopRepository } from "@/repository/stopRepository";

export class CreateStopUseCase {
  constructor(
    private readonly stopRepository: StopRepository,
    private readonly rotationRepository: RotationRepository,
    private readonly clientRepository: ClientRepository
  ){}

  async execute(
    { rotationId, clientId, sequence}:
    {rotationId: string, clientId: string, sequence: number}
  ){

    const rotation = await this.rotationRepository.getById(rotationId)
    if(!rotation){
      throw new BadRequestError("rotation does not exist")
    }

    const client = await this.clientRepository.getById(clientId)
    if(!client){
      throw new BadRequestError("Cliente não existe")
    }

    let stop = await this.stopRepository.create({
      client: {connect: {id: clientId}},
      sequence,
      Rotation: {connect: {id: rotationId}}
    })
    
    return {stop}
  }
}