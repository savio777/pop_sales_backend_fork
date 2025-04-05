import { Client, Prisma } from "@prisma/client";

export interface ClientRepository {
  create(data: Prisma.ClientCreateInput): Promise<Client>
  getByName(name: string): Promise<Client | null>
  getByEmail(email: string): Promise<Client | null>
  getById(id: string): Promise<Client | null>
  listClientService(companyId: string): Promise<Client[] | null>
  update(
    {id, data}:
    {id: string, data: Client}
  ): Promise<Client>
  delete(id: string): Promise<void>
}