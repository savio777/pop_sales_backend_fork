import { NotFoundError } from "@/error/notfound.error";
import { db } from "@/lib/prisma";
import { CompanyRepository } from "@/repository/companyRepository";

/* deve listar clientes de uma empresa que estão em atendimento */

export class ListClientServiceUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository
  ){}

  async execute(
    {companyId}:
    {companyId: string}
  ){
    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new NotFoundError("Empresa não encontrado")
    }

    const clientService = await db.checkinCheckout.findMany({
      where: {
        finalizedAt: null,
        client: {
          companyId: company.id
        }
      },
      select: {
        client: true
      }
    })

    return {clientService}
  }
} 