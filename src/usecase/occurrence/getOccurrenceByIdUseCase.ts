import { NotFoundError } from "@/error/notfound.error";
import { OccurrenceRepository } from "@/repository/occurrenceRepository";

export class GetOccurrenceByIdUseCase {
  constructor(private readonly occurrenceRepository: OccurrenceRepository) {}

  async ececute(id: string) {
    const occurrence = await this.occurrenceRepository.getById(id);
    if (!occurrence) {
      throw new NotFoundError("Ocorrencia não encontrada");
    }

    return { occurrence };
  }
}
