import { NotFoundError } from "@/error/notfound.error";
import { ServiceAssessmentRepository } from "@/repository/serviceAssessmentRepository";
import { UserRepository } from "@/repository/userRepository";

export class ListByUserServiceAssessmentUseCase {
  constructor(
    private readonly serviceAssessmentRepository: ServiceAssessmentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string) {

    const user = await this.userRepository.getById(userId);
    if(!user) {
      throw new NotFoundError("Usuário não encontrado")
    }

    const serviceAssessment = await this.serviceAssessmentRepository.listByUser(userId);

    return {serviceAssessment}
  }
}
