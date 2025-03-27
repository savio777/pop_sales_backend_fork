import { BadRequestError } from "@/error/badRequest.error";
import { CheckInCheckOutRepository } from "@/repository/checkinCheckoutRepository";
import { ClientRepository } from "@/repository/clientRepository";
import { UserRepository } from "@/repository/userRepository";

export class CheckInUseCase {
  constructor(
    private readonly checkInCheckOutRepository: CheckInCheckOutRepository,
    private readonly userRepository: UserRepository,
    private readonly clientRepository: ClientRepository
  ){}

  async execute(
    {userId, clientId}: {clientId: string, userId: string}
  ){
    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new BadRequestError("user does user does not exist")
    }

    const client = await this.clientRepository.getById(clientId)
    if(!client){
      throw new BadRequestError("client does not exist")
    }

    const checkIn = await this.checkInCheckOutRepository.checkIn({
      clientId,
      userId
    })

    return {checkIn}
  }
}