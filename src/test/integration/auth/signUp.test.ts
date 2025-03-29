import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "@/app";
import { db } from "@/lib/prisma";

describe("Testando a API", () => {
  beforeEach(async () => {
    await app.ready();
    await db.userCompany.deleteMany();
    await db.user.deleteMany();
    await db.company.deleteMany();
  });

  it("Deve criar um usuário", async () => {
    const company = await db.company.create({
      data: {
        name: "company test",
      },
    });

    const response = await request(app.server).post("/auth/sign-up").send({
      name: "user test",
      email: "userTest@email.com",
      password: "qwertyuio",
      phone: "9999999999",
      companyId: company.id,
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      user: {
        id: expect.any(String),
        name: "user test",
        email: "userTest@email.com",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        phone: "9999999999",
        status: "ACTIVE"

      }
    })
  });
});
