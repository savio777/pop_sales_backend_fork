import { BadRequestError } from "@/error/badRequest.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { RotationStopRepository } from "@/repository/rotationStopRepository";
import { UserRepository } from "@/repository/userRepository";

interface RotationsStops {
  sequence: number
  address: string
}

export class CreateRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly rotationStopRepository: RotationStopRepository,
    private readonly userRepository: UserRepository,
  ){}

  async execute(
    {assignedToId, createdById, stops}:
    {createdById: string, assignedToId: string, stops: RotationsStops[]}
  ){
    const userCreated = await this.userRepository.getById(createdById)
    if(!userCreated){
      throw new BadRequestError("user created does not exist")
    }

    const userAssigned = await this.userRepository.getById(assignedToId)
    if(!userAssigned){
      throw new BadRequestError("user assigned does not exist")
    }

    // Criando a rotação
    const rotation = await this.rotationRepository.create({
      createdBy: {connect: {id: createdById }},
      assignedTo: {connect: {id: assignedToId }},
    })

    let stopCreateds = []

    // Atribuind os endereços de parada a rotação
    for(let stop of stops){
      const result = await this.rotationStopRepository.create({
        address: stop.address,
        sequence: stop.sequence,
        rotation: {connect: {id: rotation.id}}
      })
      stopCreateds.push(result)

    }


    return {rotation, stop:stopCreateds}
  }
}