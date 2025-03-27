import { Prisma, Client } from "@prisma/client";
import { ClientRepository } from "../clientRepository";
import { db } from "@/lib/prisma";

export class PrismaClientRepository implements ClientRepository {
  async getByName(name: string): Promise<Client | null> {
    const client = await db.client.findFirst({
      where: {
        name
      }
    })
    return client
  }
  async getByEmail(email: string): Promise<Client | null> {
    const client = await db.client.findFirst({
      where: {
        email
      }
    })
    return client
  }
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const client = await db.client.create({
      data
    })
    return client
  }
}