import { Prisma, Client } from "@prisma/client";
import { ClientRepository } from "../clientRepository";
import { db } from "@/lib/prisma";

export class PrismaClientRepository implements ClientRepository {
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const client = await db.client.create({
      data
    })
    return client
  }
  
}