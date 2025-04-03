import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { db } from "@/test/setup";
import { getToken } from "@/test/lib/getToken";

describe("List Companies", () => {
  it("should be able to create company", async () => {
    const token = await getToken();

    const company = await db.company.create({
      data: {
        name: "company teste list",
      },
    });

    const response = await request(app.server)
      .get("/company")
      .set("Authorization", `Bearer ${token}`);

    await db.company.deleteMany({where: {id: company.id}})

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        companies: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: "company teste list",
            createdAt: expect.any(String), 
            updatedAt: expect.any(String),
            status: "ACTIVE",
          }),
        ]),
      })
    );
  });
});
