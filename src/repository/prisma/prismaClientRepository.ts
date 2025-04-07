import { Prisma, Client } from "@prisma/client";
import { ClientRepository } from "../clientRepository";
import { db } from "@/lib/prisma";

interface listClientServiceResponse {
  client: {
      name: string;
      id: string;
      createdAt: Date;
      updatedAt: Date;
      zipCode: string | null;
      responsiblePerson: string | null;
      phoneNumber: string | null;
      email: string | null;
      address: string | null;
      lon: string | null;
      lat: string | null;
      companyId: string | null;
  };
  createdAt: Date;
  finalizedAt: Date | null;
}

export class PrismaClientRepository implements ClientRepository {
  async listClientService(companyId: string): Promise<listClientServiceResponse[]> {
    const clientService = await db.stop.findMany({
      where: {
        client: {
          companyId,
        },
        status: "PENDING",
        finalizedAt: null
      },
      select: {
        createdAt: true,
        finalizedAt: true,
        client: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return clientService;
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
