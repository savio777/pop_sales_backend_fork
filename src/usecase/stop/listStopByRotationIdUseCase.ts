import { NotFoundError } from "@/error/notfound.error";
import { StopRepository } from "@/repository/stopRepository";

export class ListStopByRotationIdUseCase {
  constructor(private readonly stopRepository: StopRepository) {}

  async execute(rotationId: string) {
    const stops = await this.stopRepository.getByRotationId(rotationId);
    if (!stops) {
      throw new NotFoundError("Rotação não encontrada.");
    }
    return { stops };
  }
}
