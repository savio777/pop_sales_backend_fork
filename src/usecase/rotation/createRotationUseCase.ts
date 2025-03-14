import { BadRequestError } from "@/error/badRequest.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";

interface RotationsStops {
  sequence: number
  address: string
}

export class CreateRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly userRepository: UserRepository,
  ){}

  async execute(
    {assignedToId, createdById, stops, tasks}:
    {createdById: string, assignedToId: string, stops: RotationsStops[], tasks: string[]}
  ){
    const userCreated = await this.userRepository.getById(createdById)
    if(!userCreated){
      throw new BadRequestError("user created does not exist")
    }

    const userAssigned = await this.userRepository.getById(assignedToId)
    if(!userAssigned){
      throw new BadRequestError("user assigned does not exist")
    }

    // Criar Paradas
    let stopCreateds = []
    for(let stop of stops){
      const result = await this.rotationStopRepository.create({
        address: stop.address,
        sequence: stop.sequence,
      })
      stopCreateds.push(result)
    }

    // Criar Rotação
    const rotation = await this.rotationRepository.create({
      createdBy: {connect: {id: createdById }},
      assignedTo: {connect: {id: assignedToId }},
    })




    return {rotation, stop:stopCreateds}
  }
}