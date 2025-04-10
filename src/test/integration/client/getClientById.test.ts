import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { app } from "@/app";
import { db } from "@/test/setup";
import { createCompany } from "@/test/utils/createCompany";
import { createClient } from "@/test/utils/createClient";
import { getClientById } from "@/test/utils/getClientById";

describe("Get client by id", async () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to get client by id", async () => {
    const company = await createCompany()
    const client = await createClient(company.response.body.company.id)
    const response = await getClientById(client.response.body.client.id)

    await db.client.delete({
      where: {
        id: client.response.body.client.id
      }
    })

    await db.company.delete({
      where: {
        id: company.response.body.company.id
      }
    })

    expect(response.response.status).toBe(200)
    expect(response.response.body.client).toMatchObject({
      id: expect.any(String),
      createdAt: expect.any(String), 
      updatedAt: expect.any(String),
      name: client.request.name,
      zipCode: expect.any(String),
      responsiblePerson: expect.any(String),
      phoneNumber: expect.any(String),
      email: client.request.email,
      address: null,
      lon: expect.any(String),
      lat: expect.any(String),
      companyId: company.response.body.company.id
    });
  })
})