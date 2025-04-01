import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "@/app";
import { db } from "../../setup";
import { randomUUID } from "crypto";

describe("Auth sign in", () => {
  beforeEach(async () => {
    await app.ready();
    await db.$executeRaw`TRUNCATE TABLE "UserCompany", "User", "Company" RESTART IDENTITY CASCADE;`;

  });

  it("should be able to authenticate user", async () => {
    const company = await db.company.create({
      data: { 
        name: `company test - ${randomUUID()}`
      },
    });

    await request(app.server).post("/auth/sign-up").send({
      name: "user test",
      email: "userTest@email.com",
      password: "qwertyuio",
      phone: "9999999999",
      companyId: company.id,
    });

    const response = await request(app.server).post("/auth/sign-in").send({
      email: "userTest@email.com",
      password: "qwertyuio",
    });

    expect(response.status).toBe(200);
  });
});
