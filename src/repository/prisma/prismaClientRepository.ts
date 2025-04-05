import { Prisma, Client } from "@prisma/client";
import { ClientRepository } from "../clientRepository";
import { db } from "@/lib/prisma";

export class PrismaClientRepository implements ClientRepository {
  async listClientService(companyId: string): Promise<Client[] | null> {
    const clientService = await db.checkinCheckout.findMany({
      where: {
        finalizedAt: null,
        client: {
          companyId,
        },
      },
      select: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            companyId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    const client = clientService.map((service) => service.client) || null;
    return client.map((c) => ({
      ...c,
      zipCode: null,
      responsiblePerson: null,
      phoneNumber: null,
      address: null,
      lon: null,
      lat: null,
    }));
  }

  async update({ id, data }: { id: string; data: Client }): Promise<Client> {
    const client = await db.client.update({
      where: { id },
      data,
    });
    return client;
  }

  async delete(id: string): Promise<void> {
    await db.client.delete({
      where: { id },
    });
  }
  async getById(id: string): Promise<Client | null> {
    const client = await db.client.findUnique({
      where: {
        id,
      },
    });
    return client;
  }
  async getByName(name: string): Promise<Client | null> {
    const client = await db.client.findFirst({
      where: {
        name,
      },
    });
    return client;
  }
  async getByEmail(email: string): Promise<Client | null> {
    const client = await db.client.findFirst({
      where: {
        email,
      },
    });
    return client;
  }
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const client = await db.client.create({
      data,
    });
    return client;
  }
}
