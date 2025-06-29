import { PrismaCheckInCheckOutRepository } from "@/repository/prisma/prismaCheckinCheckoutRepository";
import { PrismaClientRepository } from "@/repository/prisma/prismaClientRepository";
import { PrismaStopRepository } from "@/repository/prisma/prismaStopRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { CheckInUseCase } from "@/usecase/checkIn/checkInUsecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CheckInController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const userId = req.userAuth!.id;

    const checkInRequestBody = z.object({
      clientId: z.string().uuid(),
      lat: z.string(),
      lon: z.string(),
      stopId: z.string().uuid(),
    });

    const { clientId, lat, lon, stopId } = checkInRequestBody.parse(req.body);

    const checkInCheckOutRepository = new PrismaCheckInCheckOutRepository();
    const userRepository = new PrismaUserRepository();
    const clientRepository = new PrismaClientRepository();
    const stopRepository = new PrismaStopRepository();

    const checkInUseCase = new CheckInUseCase(
      checkInCheckOutRepository,
      userRepository,
      clientRepository,
      stopRepository
    );

    const checkIn = await checkInUseCase.execute({
      clientId,
      lat,
      lon,
      stopId,
      userId,
    });

    return res.status(200).send(checkIn);
  }
}
