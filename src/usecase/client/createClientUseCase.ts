import { BadRequestError } from "@/error/badRequest.error";
import { ClientRepository } from "@/repository/clientRepository";
import { CompanyRepository } from "@/repository/companyRepository";

export class CreateClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(
    {
      name,
      email,
      lat,
      lon,
      phoneNumber,
      zipCode,
      responsiblePerson,
      companyId
    }: {
      name: string,
      email?: string,
      lon?: string,
      lat?: string,
      phoneNumber?: string,
      zipCode?: string,
      responsiblePerson?: string,
      companyId: string
    }
  ){
    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new BadRequestError("company is not exist")
    }

    if(email){
      const clientEmail = await this.clientRepository.getByEmail(email)
      if(clientEmail){
        throw new BadRequestError("client already created with email")
      }
    }

    const clientEmail = await this.clientRepository.getByName(name)
    if(clientEmail){
      throw new BadRequestError("client already created with name")
    }
    
    const client = await this.clientRepository.create({
      name, 
      email, 
      lon, 
      lat, 
      phoneNumber, 
      zipCode, 
      Company: {connect: {id: companyId}},
      responsiblePerson
    })

    return {client}
  }
}