import { BadRequestError } from "@/error/badRequest.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";

interface UpdateRotation {
  userId?: string
  companyId?: string
}

export class UpdateRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(
    {id, data}:
    {id: string, data: UpdateRotation}
  ){

    const rotation = await this.rotationRepository.getById(id)
    if(!rotation){
      throw new BadRequestError("rotation does not exist")
    }

    if(data.companyId){
      const company = await this.companyRepository.getById(data.companyId)
      if(!company){
        throw new BadRequestError("company does not exist")
      }
    }

    if(data.userId){
      const user = await this.userRepository.getById(data.userId)
      if(!user){
        throw new BadRequestError("user does not exist")
      }
    }

    const rotationUpdated = await this.rotationRepository.update({
      id, 
      data: {
        ...(data.companyId ? {Company: {connect: {id: data.companyId}} }: {}),
        ...(data.userId ? {users: {connect: {id: data.userId}}}: {})
      }
    })

    return {rotation: rotationUpdated}
  }
}