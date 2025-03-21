import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { RotationRepository } from "@/repository/rotationRepository";

export class CreateRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(
    {companyId}:
    {companyId: string}
  ){

    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new BadRequestError("company does not exist")
    }

    const rotation = await this.rotationRepository.create({
      Company: {connect: {id: company.id}}
    })

    return {rotation}
  }
}