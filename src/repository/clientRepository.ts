import { Client, Prisma } from "@prisma/client";

export interface ClientRepository {
  create(data: Prisma.ClientCreateInput): Promise<Client>
}