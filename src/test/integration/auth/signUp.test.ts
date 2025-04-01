import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "@/app";
import { db } from "../../setup";
import { randomUUID } from "crypto";

describe("Auth sign up", () => {
  beforeEach(async () => {
    await app.ready();
    await db.$executeRaw`TRUNCATE TABLE "UserCompany", "User", "Company" RESTART IDENTITY CASCADE;`;
  });

  it("Should be able to register a new user", async () => {
    const company = await db.company.create({
      data: {
        name: `company test - ${randomUUID()}`,
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

  it("should not be able to register with the some email", async () => {
    const company = await db.company.create({
      data: {
        name: `company test - ${randomUUID()}`,
      },
    });

    await request(app.server).post("/auth/sign-up").send({
      name: "user test",
      email: "userTest@email.com",
      password: "qwertyuio",
      phone: "9999999999",
      companyId: company.id,
    });

    const response = await request(app.server).post("/auth/sign-up").send({
      name: "user test",
      email: "userTest@email.com",
      password: "qwertyuio",
      phone: "9999999999",
      companyId: company.id,
    });

    expect(response.status).toBe(409)
  })
});
