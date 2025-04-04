import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { db } from "@/test/setup";
import { randomUUID } from "crypto";
import { app } from "@/app";
import { generateEmail } from "@/test/lib/generateEmail";
import { getToken } from "@/test/lib/getToken";

describe("List Clients by Company Id", async () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able list clients by company id", async () => {
    const token = await getToken();

    const company = await db.company.create({
      data: {
        name: "company test list client by companyId" + randomUUID(),
      },
    });


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
        zipCode: undefined,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app.server)
      .get(`/client/${client.body.client.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.client).toMatchObject({
      id: client.body.client.id,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      name: client.body.client.name,
      zipCode: client.body.client.zipCode,
      responsiblePerson: client.body.client.responsiblePerson,
      phoneNumber: null,
      email: client.body.client.email,
      address: client.body.client.address,
      lon: client.body.client.lon,
      lat: client.body.client.lat,
      companyId: company.id,
    });

    await db.client.delete({
      where: {
        id: client.body.client.id,
      },
    });

    await db.company.delete({
      where: {
        id: company.id,
      },
    });
  });
});
