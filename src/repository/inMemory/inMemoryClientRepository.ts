import { Prisma, Client } from "@prisma/client";
import { ClientRepository } from "../clientRepository";
import { randomUUID } from "crypto";

export class InMemoryClientRepository implements ClientRepository {
  private client: Client[] = []
  
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
   const client: Client = {
      id: randomUUID(),
      companyId: data.Company?.connect?.id!,
      address: data.address ?? null,
      email: data.email ?? null,
      lat: data.lat ?? null,
      lon: data.lon ?? null,
      name: data.name ?? undefined,
      phoneNumber: data.phoneNumber ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
      responsiblePerson: data.responsiblePerson ?? null,
      zipCode: data.zipCode ?? null
    }

   this.client.push(client)
   return client
  }
  async getByName(name: string): Promise<Client | null> {
    const client = this.client.find(e => e.name === name)
    return client || null
  }
  async getByEmail(email: string): Promise<Client | null> {
    const client = this.client.find(e => e.email === email)
    return client || null
  }
  async getById(id: string): Promise<Client | null> {
    const client = this.client.find(e => e.id === id)
    return client || null
  }
}