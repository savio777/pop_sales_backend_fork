import { Client, Prisma } from "@prisma/client";

export interface ClientRepository {
  create(data: Prisma.ClientCreateInput): Promise<Client>
  getByName(name: string): Promise<Client | null>
  getByEmail(email: string): Promise<Client | null>
}