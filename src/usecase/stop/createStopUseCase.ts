import { NotFoundError } from "@/error/notfound.error";
import { ClientRepository } from "@/repository/clientRepository";
import { RotationRepository } from "@/repository/rotationRepository";
import { StopRepository } from "@/repository/stopRepository";

export class CreateStopUseCase {
  constructor(
    private readonly stopRepository: StopRepository,
    private readonly rotationRepository: RotationRepository,
    private readonly clientRepository: ClientRepository
  ) {}

  async execute({
    rotationId,
    clientId,
    sequence,
  }: {
    rotationId: string;
    clientId: string;
    sequence: number;
  }) {
    const rotation = await this.rotationRepository.getById(rotationId);
    if (!rotation) {
      throw new NotFoundError("Rotação não encontrada.");
    }

    const client = await this.clientRepository.getById(clientId);
    if (!client) {
      throw new NotFoundError("Cliente não encontrado.");
    }

    const stop = await this.stopRepository.create({
      client: { connect: { id: clientId } },
      sequence,
      Rotation: { connect: { id: rotationId } },
    });

    return { stop };
  }
}
