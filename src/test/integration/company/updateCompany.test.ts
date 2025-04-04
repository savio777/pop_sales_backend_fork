import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { randomUUID } from "crypto";
import { db } from "@/test/setup";
import { getToken } from "@/test/lib/getToken";

describe("Update Company", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to create company", async () => {
    const token = await getToken(); 

    const company = await db.company.create({
      data: {
        name: "company"
      }
    })

    const response = await request(app.server)
      .patch(`/company/${company.id}`)
      .send({
        name: "company updated", 
      })
      .set('Authorization', `Bearer ${token}`);

    await db.company.delete({
      where: {
        id: company.id
      }}
    )

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      company: expect.objectContaining({
        id: company.id,
        name: "company updated",
        createdAt: expect.any(String), 
        updatedAt: expect.any(String), 
        status: "ACTIVE"
      })
    });
  });
});
