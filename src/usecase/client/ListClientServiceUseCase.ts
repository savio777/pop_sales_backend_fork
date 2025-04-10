import { NotFoundError } from "@/error/notfound.error";
import { ClientRepository } from "@/repository/clientRepository";
import { CompanyRepository } from "@/repository/companyRepository";

/* deve listar clientes de uma empresa que estão em atendimento */

export class ListClientServiceUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly clientRepository: ClientRepository
  ){}

  async execute(
    {companyId}:
    {companyId: string}
  ){
    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new NotFoundError("Empresa não encontrado")
    }

    const clientService = await this.clientRepository.listClientService(companyId)

    if(!clientService){
      throw new NotFoundError("Nenhum cliente em atendimento")
    }

    return {clientService}
  }
} 