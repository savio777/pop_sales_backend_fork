import { NotFoundError } from "@/error/notfound.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { OccurrenceRepository } from "@/repository/occurrenceRepository";

export class ListOccurrenceByCompanyIdUseCase {
  constructor(
    private readonly occurrenceRepository: OccurrenceRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute({
    companyId,
    periodEnd,
    periodStart,
    limit,
    page,
  }: {
    companyId: string;
    periodStart: Date;
    periodEnd: Date;
    limit: number;
    page: number;
  }) {
    const company = await this.companyRepository.getById(companyId);
    if (!company) {
      throw new NotFoundError("Empresa não encontrada");
    }

    const occurrences = await this.occurrenceRepository.listByCompany({
      companyId,
      limit,
      page,
      periodEnd,
      periodStart,
    });

    return { occurrences };
  }
}
