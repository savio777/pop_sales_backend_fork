import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";
import { Prisma } from "@prisma/client";


export class UpdateRotationUseCase {
  constructor(
    private readonly rotationRepository: RotationRepository,
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(
    {id, data}:
    {id: string, data: Prisma.RotationUpdateInput}
  ){

    const rotation = await this.rotationRepository.getById(id)
    if(!rotation){
      throw new BadRequestError("rotation does not exist")
    }

    if(data.Company){
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
      data
    })
    

    return {rotation: rotationUpdated}
  }
}