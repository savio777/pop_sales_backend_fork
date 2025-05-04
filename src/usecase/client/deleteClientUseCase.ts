import { ClientRepository } from "@/repository/clientRepository";

export class DeleteClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository
  ){}

  async execute(id: string){
    const clientIsNotExists = await this.clientRepository.getById(id)
    if(!clientIsNotExists){
      throw new Error("Cliente não encontrado")
    }

    const client = await this.clientRepository.update({
      id,
      data: {
        status: "INACTIVE"
      }
    })

    return {
      client   
    }
  }
}