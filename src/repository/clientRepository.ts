import { Client, Prisma } from "@prisma/client";

export interface listClientServiceResponse {
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

export interface ClientRepository {
  create(data: Prisma.ClientCreateInput): Promise<Client>
  getByName(name: string): Promise<Client | null>
  getByEmail(email: string): Promise<Client | null>
  getById(id: string): Promise<Client | null>
  listClientService(companyId: string): Promise<listClientServiceResponse[]>
  update(
    {id, data}:
    {id: string, data: Client}
  ): Promise<Client>
  delete(id: string): Promise<void>
}