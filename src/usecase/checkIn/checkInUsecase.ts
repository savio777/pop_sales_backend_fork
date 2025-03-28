import { BadRequestError } from "@/error/badRequest.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { CheckInCheckOutRepository } from "@/repository/checkinCheckoutRepository";
import { ClientRepository } from "@/repository/clientRepository";
import { UserRepository } from "@/repository/userRepository";
import { getDistance } from "@/service/getDistance";

export class CheckInUseCase {
  constructor(
    private readonly checkInCheckOutRepository: CheckInCheckOutRepository,
    private readonly userRepository: UserRepository,
    private readonly clientRepository: ClientRepository,
  ){}

  async execute(
    {userId, clientId, lon, lat}: 
    {clientId: string, userId: string, lon: string, lat: string}
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

    const alreadyCheckIn = await this.checkInCheckOutRepository.getCheckInByDate({
      clientId, userId, date: new Date()
    })
    if(alreadyCheckIn){
      throw new BadRequestError("Have you checked in at this company today?")
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

    if(distance < 100){
      throw new UnauthorizedError("You need to be at least 100m away from the client to check in")
    }

    const checkIn = await this.checkInCheckOutRepository.checkIn({
      clientId,
      userId
    })

    return {checkIn}
  }
}