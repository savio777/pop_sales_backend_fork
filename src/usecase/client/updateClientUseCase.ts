import { BadRequestError } from "@/error/badRequest.error";
import { ClientRepository } from "@/repository/clientRepository";
import { Prisma } from "@prisma/client";

export class UpdateClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository
  ) { }

  async execute(id: string, data: Prisma.ClientUpdateInput) {
    const emailAlreadyExist = await this.clientRepository.getByEmail(data.email as string)
    if (emailAlreadyExist && data.email !== emailAlreadyExist.email) {
      throw new BadRequestError("Email já cadastrado")
    }

    const nameAlreadyExists = await this.clientRepository.getByName(data.name as string)
    if (nameAlreadyExists && data.name!== nameAlreadyExists.name) {
      throw new BadRequestError("Nome já cadastrado")
    }

    const client = await this.clientRepository.update({ id, data })
    return { client }
  }
}