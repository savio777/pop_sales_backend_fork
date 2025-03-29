import { BadRequestError } from "@/error/badRequest.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { CheckInCheckOutRepository } from "@/repository/checkinCheckoutRepository";
import { ClientRepository } from "@/repository/clientRepository";
import { StopRepository } from "@/repository/stopRepository";
import { UserRepository } from "@/repository/userRepository";
import { getDistance } from "@/service/getDistance";

export class CheckInUseCase {
  constructor(
    private readonly checkInCheckOutRepository: CheckInCheckOutRepository,
    private readonly userRepository: UserRepository,
    private readonly clientRepository: ClientRepository,
    private readonly stopRepository: StopRepository
  ){}

  async execute(
    {userId, clientId, lon, lat, stopId}: 
    {clientId: string, userId: string, lon: string, lat: string, stopId: string}
  ){
    if (!lat || !lon) {
      throw new BadRequestError("Latitude and longitude must be provided for check-in");
    }

    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new BadRequestError("user does user does not exist")
    }

    const client = await this.clientRepository.getById(clientId)
    if(!client){
      throw new BadRequestError("client does not exist")
    }
    if(!client.lat || !client.lon){
      throw new BadRequestError("client does not lat and lon registred")
    }

    const stop = await this.stopRepository.getById(stopId)
    if(!stop){
      throw new BadRequestError("stop does not exist")
    }
    if(stop.status === "COMPLETED"){
      throw new BadRequestError("Have you checked in at this company today?")
    }

    await this.stopRepository.update({
      id: stop.id,
      data: {
        status: "COMPLETED"
      }
    })

    if(stop.clientId !== clientId){
      throw new BadRequestError("You cannot check in this customer as they are not in your rotation.")
    }

    const distance = getDistance({
      address1: {
        lat: client.lat,
        lon: client.lon
      },
      address2: {
        lat,
        lon
      }
    })

    if(distance > 100){
      throw new UnauthorizedError("You need to be at least 100m away from the client to check in")
    }

    const checkIn = await this.checkInCheckOutRepository.checkIn({
      clientId,
      userId
    })

    return {checkIn}
  }
}