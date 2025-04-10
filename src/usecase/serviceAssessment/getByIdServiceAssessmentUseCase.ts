import { NotFoundError } from "@/error/notfound.error";
import { ServiceAssessmentRepository } from "@/repository/serviceAssessmentRepository";

export class GetByIdServiceAssessmentUseCase {
  constructor(
    private readonly serviceAssessmentRepository: ServiceAssessmentRepository,
  ) {}

  async execute(id: string) {

    const serviceAssessment = await this.serviceAssessmentRepository.getById(id);
    if(!serviceAssessment) {
      throw new NotFoundError("Avaliação não encontrada")
    }

    return {serviceAssessment}
  }
}
