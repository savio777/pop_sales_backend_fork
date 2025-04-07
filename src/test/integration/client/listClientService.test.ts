import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { app } from "@/app";
import { createCompany } from "@/test/utils/createCompany";
import { createClient } from "@/test/utils/createClient";
import { listClientService } from "@/test/utils/listClientService";

describe("List Client Service", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  //TODO: este teste so pode ser feito depois de fazer checkIn
  // deve mudar o repository para retornar checkInCheckOut (createdAt, finalizadAt) e client
  // deve retornar apenas cliente que no checkInCheckout não possue finalizadAt
  
  it("should be able to list all clients by company", async () => {
    const company = await createCompany()
    const client = await createClient(company.response.body.company.id)

    const {response} = await listClientService(company.response.body.company.id)
    console.log(response.body)
    expect(response.statusCode).toEqual(200)
    expect(response.body.clients).toEqual([{
      id: expect.any(String),
      name: client.response.body.client.name,
      email: client.response.body.client.email,
      phone: client.response.body.client.phone,
      address: null,
      companyId: company.response.body.company.id,
      createdAt: expect.any(String),
      lat: response.body.clients.lat,
      lon: response.body.clients.lon,
      phoneNumber: response.body.clients.phoneNumber,
      responsiblePerson: response.body.clients.responsiblePerson,
      updatedAt: expect.any(String),
      zipCode: response.body.clients[0].zipCode,
    }]) 
  });
});
