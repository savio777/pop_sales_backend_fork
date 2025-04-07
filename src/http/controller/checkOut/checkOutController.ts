import { PrismaCheckInCheckOutRepository } from "@/repository/prisma/prismaCheckinCheckoutRepository";
import { PrismaClientRepository } from "@/repository/prisma/prismaClientRepository";
import { PrismaStopRepository } from "@/repository/prisma/prismaStopRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { CheckOutUseCase } from "@/usecase/checkOut/checkOutUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CheckOutController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const userId = req.userAuth!.id

    const checkOutRequestBody = z.object({
      clientId: z.string().uuid(),
      lat: z.string(),
      lon: z.string(),
      stopId: z.string().uuid(),
      checkInChekcOutId: z.string().uuid(),
      rotationId: z.string().uuid()
    })

    const data = checkOutRequestBody.parse(req.body)

    const checkInCheckOutRepository = new PrismaCheckInCheckOutRepository()
    const userRepository = new PrismaUserRepository() 
    const clientRepository = new PrismaClientRepository()
    const stopRepository = new PrismaStopRepository()

    const checkOutUseCase = new CheckOutUseCase(
      checkInCheckOutRepository,
      userRepository,
      clientRepository,
      stopRepository
    )

    const checkOut = await checkOutUseCase.execute({...data, userId})

    return res.status(200).send(checkOut)
  }
}