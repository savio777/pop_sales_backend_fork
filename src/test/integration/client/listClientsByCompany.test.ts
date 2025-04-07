import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { db } from "@/test/setup";
import { app } from "@/app";
import { createCompany } from "@/test/utils/createCompany";
import { createClient } from "@/test/utils/createClient";
import { listClientByCompayId } from "@/test/utils/listClientByCompayId";

describe("List Clients by Company Id", async () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able list clients by company id", async () => {
    const company = await createCompany()
    const client = await createClient(company.response.body.company.id)
    const response = await listClientByCompayId(company.response.body.company.id)

    await db.client.delete({
      where: {
        id: client.response.body.client.id,
      },
    });

    await db.company.delete({
      where: {
        id: company.response.body.company.id,
      },
    });

    expect(response.response.status).toBe(200);
    expect(response.response.body.clients).toEqual([{
      id: client.response.body.client.id,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      name: client.response.body.client.name,
      zipCode: client.response.body.client.zipCode,
      responsiblePerson: client.response.body.client.responsiblePerson,
      phoneNumber: client.response.body.client.phoneNumber,
      email: client.response.body.client.email,
      address: client.response.body.client.address,
      lon: client.response.body.client.lon,
      lat: client.response.body.client.lat,
      companyId: company.response.body.company.id,
    }]);

  });
});
