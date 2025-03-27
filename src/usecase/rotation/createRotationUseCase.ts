import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { RotationRepository } from "@/repository/rotationRepository";

export class CreateRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(
    {companyId, description}:
    {companyId: string, description?: string}
  ){

    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new BadRequestError("company does not exist")
    }

    const rotation = await this.rotationRepository.create({
      companyId: company.id,
      description
    })

    return {rotation}
  }
}