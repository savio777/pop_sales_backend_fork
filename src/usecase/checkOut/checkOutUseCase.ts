import { BadRequestError } from "@/error/badRequest.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { db } from "@/lib/prisma";
import { CheckInCheckOutRepository } from "@/repository/checkinCheckoutRepository";
import { ClientRepository } from "@/repository/clientRepository";
import { StopRepository } from "@/repository/stopRepository";
import { UserRepository } from "@/repository/userRepository";
import { getDistance } from "@/service/getDistance";
import { differenceInMinutes } from "date-fns";

export class CheckOutUseCase {
  constructor(
    private readonly checkInCheckOutRepository: CheckInCheckOutRepository,
    private readonly userRepository: UserRepository,
    private readonly clientRepository: ClientRepository,
    private readonly stopRepository: StopRepository
  ) {}

  async execute({
    userId,
    clientId,
    lon,
    lat,
    stopId,
    checkInChekcOutId,
    rotationId
  }: {
    clientId: string;
    userId: string;
    lon: string;
    lat: string;
    stopId: string;
    checkInChekcOutId: string;
    rotationId: string;
  }) {
    if (!lat || !lon) {
      throw new BadRequestError(
        "Latitude e longitude devem ser fornecidas para o check-in"
      );
    }

    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new BadRequestError("Usuário não existe");
    }

    const client = await this.clientRepository.getById(clientId);
    if (!client) {
      throw new BadRequestError("Cliente não existe");
    }
    if (!client.lat || !client.lon) {
      throw new BadRequestError(
        "Cliente não tem longitude e Latitude registrada"
      );
    }

    const stop = await this.stopRepository.getById(stopId);
    if (!stop) {
      throw new BadRequestError("Parada não existe");
    }
    if (stop.status === "COMPLETED") {
      throw new BadRequestError("Você já fez check-out nesta empresa hoje");
    }

    const rotation = await db.rotation.findUnique({
      where: {
        id: rotationId,
      }
    });

    if(!rotation){
      throw new BadRequestError("Rotação não existe");
    }

    const distance = getDistance({
      address1: {
        lat: client.lat,
        lon: client.lon,
      },
      address2: {
        lat,
        lon,
      },
    });

    if (distance > 100) {
      throw new UnauthorizedError(
        "Você precisa estar a pelo menos 100m de distância do cliente para fazer o check-in"
      );
    }

    const checkIn = await this.checkInCheckOutRepository.getById(
      checkInChekcOutId
    );
    if (!checkIn) {
      throw new BadRequestError("checkIn não encontrado");
    }

    const finalizedAt = new Date();
    const minutes = differenceInMinutes(finalizedAt, checkIn.createdAt);

    await this.stopRepository.update({
      id: stop.id,
      data: {
        status: "COMPLETED",
        finalizedAt: new Date(),      },
    });

    const isStopsFinalized = await db.stop.findMany({
      where: {
        rotationId,
        status: "PENDING",
      },
    });

    console.log(isStopsFinalized)

    if(isStopsFinalized.length === 0){
      await this.checkInCheckOutRepository.update({
        id: checkInChekcOutId,
        data: {
          finalizedAt: new Date(), 
          serviceDuration: minutes,
        },
      });

      return { mensage: "Todas as paradas foram finalizadas, rotação concluida!"}
    }


    return { mensage: `Parada foi concluida!, mas ainda faltam ${isStopsFinalized.length} paradas para finalizar a rotação.`};
  }
}
