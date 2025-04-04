import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { getToken } from "@/test/lib/getToken";
import { db } from "@/test/setup";
import { generateEmail } from "@/test/lib/generateEmail";
import { randomUUID } from "crypto";

describe("Create Client", async () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able create client", async () => {
    const token = await getToken()

    const company = await db.company.create({
      data: {
        name: "company test create client" + randomUUID()
      }
    })

    const client = {
      name: "client test" + randomUUID(), 
      companyId: company.id, 
      email: generateEmail(), 
      lat: undefined, 
      lon: undefined, 
      address: "bar do caldeira, centro manaus am",
      phoneNumber: undefined, 
      responsiblePerson: undefined, 
      zipCode: undefined
    }

    const response = await request(app.server)
      .post("/client")
      .send(client)
      .set('Authorization', `Bearer ${token}`)

      await db.client.delete({
        where: {
          id: response.body.client.id
        }
      })
  
      await db.company.delete({
        where: {
          id: company.id
        }
      })

    expect(response.status).toBe(201)
    expect(response.body.client).toMatchObject({
      id: expect.any(String),
      createdAt: expect.any(String), 
      updatedAt: expect.any(String),
      name: client.name,
      zipCode: null,
      responsiblePerson: null,
      phoneNumber: null,
      email: client.email,
      address: null,
      lon: expect.any(String),
      lat: expect.any(String),
      companyId: company.id
    });
    
  })
})