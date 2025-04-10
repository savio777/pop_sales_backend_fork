import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { ServiceAssessmentRepository } from "@/repository/serviceAssessmentRepository";

export class ListByCompanyServiceAssessmentUseCase {
  constructor(
    private readonly serviceAssessmentRepository: ServiceAssessmentRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(companyId: string) {
    const company = await this.companyRepository.getById(companyId);
    if(!company) {
      throw new NotFoundError("Empresa não encontrada")  
    }

    const serviceAssessment = await this.serviceAssessmentRepository.listByCompany(companyId);

    return {serviceAssessment}
  }
}
