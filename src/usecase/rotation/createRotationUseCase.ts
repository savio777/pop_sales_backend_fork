import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRotationRepository } from "@/repository/userRotationRepository";

export class CreateRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRotationRepository: UserRotationRepository
  ){}

  async execute(
    {companyId, description, userId}:
    {companyId: string, description?: string, userId: string}
  ){

    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new BadRequestError("company does not exist")
    }

    const rotation = await this.rotationRepository.create({
      companyId: company.id,
      description
    })

    await this.userRotationRepository.create({
      User: {connect: {id: userId}},
      Rotation: {connect: {id: rotation.id}}
    })

    return {rotation}
  }
}