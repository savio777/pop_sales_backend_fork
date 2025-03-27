import { BadRequestError } from "@/error/badRequest.error";
import { ClientRepository } from "@/repository/clientRepository";
import { CompanyRepository } from "@/repository/companyRepository";
import { GetLatLonByAddress } from "@/service/getLatLonByAddress";

export class CreateClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly companyRepository: CompanyRepository
  ){}

  // verificar lon e lat automaticamente se não for informado

  async execute(
    {
      name,
      email,
      lat,
      lon,
      phoneNumber,
      zipCode,
      responsiblePerson,
      address,
      companyId
    }: {
      name: string,
      email?: string,
      lon?: string,
      lat?: string,
      phoneNumber?: string,
      zipCode?: string,
      responsiblePerson?: string,
      companyId: string,
      address?: string
    }
  ){
    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new BadRequestError("company does not exist")
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

    if(address  && !lat || !lon){
      const data = await GetLatLonByAddress("rua rosa de maio, 95 colonia santo antonio")
      console.log(data)
      return data
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