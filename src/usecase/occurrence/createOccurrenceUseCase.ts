import { OccurrenceRepository } from "@/repository/occurrenceRepository";
import { Prisma } from "@prisma/client";

export class CreateOcurrenceUseCase {
  constructor(
    private readonly occurrenceRepository: OccurrenceRepository
  ){}

  async execute(data: Prisma.OccurrenceCreateInput){
    const occurrence = await this.occurrenceRepository.create(data)
    return {occurrence}
  }
}