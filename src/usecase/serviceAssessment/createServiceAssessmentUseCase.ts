import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
import { ClientRepository } from "@/repository/clientRepository";
import { CompanyRepository } from "@/repository/companyRepository";
import { ServiceAssessmentRepository } from "@/repository/serviceAssessmentRepository";
import { UserRepository } from "@/repository/userRepository";

export class CreateServiceAssessmentUseCase {
  constructor(
    private readonly serviceAssessmentRepository: ServiceAssessmentRepository,
    private readonly userRepository: UserRepository,
    private readonly clientRepository: ClientRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(
    {userId, clientId, companyId, description, ratingStars}:
    {userId: string, clientId: string, companyId: string, ratingStars: number, description?: string}
  ) {

    const user = await this.userRepository.getById(userId);
    if(!user) {
      throw new NotFoundError("Usuário não encontrado")
    }

    const client = await this.clientRepository.getById(clientId);
    if(!client) {
      throw new NotFoundError("Cliente não encontrado")
    }

    const company = await this.companyRepository.getById(companyId);
    if(!company) {
      throw new NotFoundError("Empresa não encontrada")  
    }

    if(!ratingStars) {
      throw new BadRequestError("Avaliação não pode ser vazia")
    }

    const serviceAssessment = await this.serviceAssessmentRepository.create({
      ratingStars,
      description,
      User: {connect: {id: userId}},
      Client: {connect: {id: clientId}},
      Company: {connect: {id: companyId}},
    });

    return {serviceAssessment}
  }
}
