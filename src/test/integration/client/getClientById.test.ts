import { describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { getToken } from "@/test/lib/getToken";
import { db } from "@/test/setup";
import { randomUUID } from "crypto";
import { generateEmail } from "@/test/lib/generateEmail";

describe("Get client by id", async () => {
  it("should be able to get client by id", async () => {
    const token = await getToken()

    const company = await db.company.create({
      data: {
        name: "company test create client" + randomUUID()
      }
    })
    
    const client = await request(app.server)
      .post("/client")
      .send({
        name: "client test" + randomUUID(), 
        companyId: company.id, 
        email: generateEmail(), 
        lat: undefined, 
        lon: undefined, 
        address: "bar do caldeira, centro manaus am",
        phoneNumber: undefined, 
        responsiblePerson: undefined, 
        zipCode: undefined
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app.server)
    .get(`/client/${client.body.client.id}`)
    .set("Authorization", `Bearer ${token}`)

    await db.client.delete({
      where: {
        id: client.body.client.id
      }
    })

    await db.company.delete({
      where: {
        id: company.id
      }
    })

    expect(response.status).toBe(200)
    expect(response.body.client).toMatchObject({
      id: expect.any(String),
      createdAt: expect.any(String), 
      updatedAt: expect.any(String),
      name: client.body.client.name,
      zipCode: null,
      responsiblePerson: null,
      phoneNumber: null,
      email: client.body.client.email,
      address: null,
      lon: expect.any(String),
      lat: expect.any(String),
      companyId: company.id
    });
  })
})