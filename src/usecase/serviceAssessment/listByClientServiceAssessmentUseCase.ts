import { NotFoundError } from "@/error/notfound.error";
import { ClientRepository } from "@/repository/clientRepository";
import { ServiceAssessmentRepository } from "@/repository/serviceAssessmentRepository";

export class ListByClientServiceAssessmentUseCase {
  constructor(
    private readonly serviceAssessmentRepository: ServiceAssessmentRepository,
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(clientId: string) {

    const client = await this.clientRepository.getById(clientId);
    if(!client) {
      throw new NotFoundError("Cliente não encontrado")
    }

    const serviceAssessment = await this.serviceAssessmentRepository.listByClient(clientId);

    return {serviceAssessment}
  }
}
