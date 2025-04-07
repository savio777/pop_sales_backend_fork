import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { app } from "@/app";
import { db } from "@/test/setup";
import { createCompany } from "@/test/utils/createCompany";
import { createClient } from "@/test/utils/createClient";

describe("Create Client", async () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able create client", async () => {
    const company = await createCompany()
    const client = await createClient(company.response.body.company.id)

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

    expect(client.response.status).toBe(201)
    expect(client.response.body.client).toMatchObject({
      id: expect.any(String),
      createdAt: expect.any(String), 
      updatedAt: expect.any(String),
      name: client.response.body.client.name,
      zipCode: expect.any(String),
      responsiblePerson: expect.any(String),
      phoneNumber: expect.any(String),
      email: client.response.body.client.email,
      address: null,
      lon: expect.any(String),
      lat: expect.any(String),
      companyId: company.response.body.company.id
    });
    
  })
})