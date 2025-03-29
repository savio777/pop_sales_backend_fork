import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";
import { UserRotationRepository } from "@/repository/userRotationRepository";

export class CreateRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRotationRepository: UserRotationRepository,
    private readonly userRepository: UserRepository
  ){}

  async execute(
    {companyId, description, userId}:
    {companyId: string, description?: string, userId: string}
  ){

    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new BadRequestError("company does not exist")
    }

    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new BadRequestError("Usuário não encontrado")
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