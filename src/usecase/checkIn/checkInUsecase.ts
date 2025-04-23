import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
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
  ) {}

  async execute({
    userId,
    clientId,
    lon,
    lat,
    stopId,
  }: {
    clientId: string;
    userId: string;
    lon: string;
    lat: string;
    stopId: string;
  }) {
    if (!lat || !lon) {
      throw new BadRequestError(
        "Latitude (lat) e longitude (lon) devem ser fornecidas para o check-in"
      );
    }

    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const client = await this.clientRepository.getById(clientId);
    if (!client) {
      throw new NotFoundError("Cliente não encontrado");
    }
    if (!client.lat || !client.lon) {
      throw new BadRequestError(
        "Localização do cliente não cadastrada. Não é possível calcular a distância para o check-in."
      );
    }

    const stop = await this.stopRepository.getById(stopId);
    if (!stop) {
      throw new NotFoundError("Parada não encontrada");
    }
    if (stop.status === "COMPLETED") {
      throw new BadRequestError("Você já fez check-in nesta empresa hoje");
    }

    if (stop.clientId !== clientId) {
      throw new BadRequestError(
        "Você não pode fazer o check-in deste cliente, pois ele não está na sua rotação."
      );
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

    const checkIn = await this.checkInCheckOutRepository.create({
      clientId,
      userId,
    });

    return { checkIn };
  }
}
