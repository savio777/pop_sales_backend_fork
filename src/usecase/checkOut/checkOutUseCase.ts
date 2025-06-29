import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
import { CheckInCheckOutRepository } from "@/repository/checkinCheckoutRepository";
import { ClientRepository } from "@/repository/clientRepository";
import { RotationRepository } from "@/repository/rotationRepository";
import { StopRepository } from "@/repository/stopRepository";
import { UserRepository } from "@/repository/userRepository";
import { getDistance } from "@/service/getDistance";
import { differenceInMinutes } from "date-fns";

export class CheckOutUseCase {
  constructor(
    private readonly checkInCheckOutRepository: CheckInCheckOutRepository,
    private readonly userRepository: UserRepository,
    private readonly clientRepository: ClientRepository,
    private readonly stopRepository: StopRepository,
    private readonly rotationRepository: RotationRepository
  ) {}

  async execute({
    userId,
    clientId,
    lon,
    lat,
    stopId,
    checkInChekcOutId,
    rotationId,
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
      throw new NotFoundError("Usuário não existe");
    }

    const client = await this.clientRepository.getById(clientId);
    if (!client) {
      throw new NotFoundError("Cliente não existe");
    }
    if (!client.lat || !client.lon) {
      throw new BadRequestError(
        "Cliente não tem longitude e Latitude registrada"
      );
    }

    const stop = await this.stopRepository.getById(stopId);
    if (!stop) {
      throw new NotFoundError("Parada não existe");
    }
    if (stop.status === "COMPLETED") {
      throw new BadRequestError("Você já fez check-out nesta empresa hoje");
    }

    const rotation = await this.rotationRepository.getById(rotationId);
    if (!rotation) {
      throw new NotFoundError("Rotação não existe");
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

    if (distance < 100) {
      throw new BadRequestError(
        "Você precisa estar a pelo menos 100m de distância do cliente para fazer o check-in"
      );
    }

    const checkIn = await this.checkInCheckOutRepository.getById(
      checkInChekcOutId
    );
    if (!checkIn) {
      throw new NotFoundError("checkIn não encontrado");
    }

    const finalizedAt = new Date();
    const minutes = differenceInMinutes(finalizedAt, checkIn.createdAt);

    await this.stopRepository.update({
      id: stop.id,
      data: {
        status: "COMPLETED",
        finalizedAt: new Date(),
      },
    });

    const isStopsFinalized =
      await this.stopRepository.listByRotationIdAndStatus({
        rotationId,
        status: "PENDING",
      });

    if (isStopsFinalized && isStopsFinalized.length === 0) {
      await this.checkInCheckOutRepository.update({
        id: checkInChekcOutId,
        data: {
          finalizedAt: new Date(),
          serviceDuration: minutes,
        },
      });

      return {
        message: "Todas as paradas foram finalizadas, rotação concluida!",
      };
    }

    return {
      message: `Parada foi concluida!, mas ainda faltam ${
        isStopsFinalized ? isStopsFinalized.length : "algumas"
      } paradas para finalizar a rotação.`,
    };
  }
}
