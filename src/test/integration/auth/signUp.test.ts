import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { db } from "../../setup";
import { app } from "@/app";
import { randomUUID } from "crypto";
import { BadRequestError } from "@/error/badRequest.error";

describe("Auth sign up", () => {
  // Antes de cada teste, garantir que o banco de dados esteja limpo
  afterEach(async () => {
    await db.userCompany.deleteMany();
    await db.userPermission.deleteMany()
    await db.user.deleteMany();
    await db.company.deleteMany();
  });

  beforeEach(async () => {
    await db.userPermission.deleteMany()
    await db.userCompany.deleteMany();
    await db.user.deleteMany();
    await db.company.deleteMany();
  });

  it("Should be able to register a new user", async () => {
    const company = await db.company.create({
      data: {
        name: `company test`,
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
        status: "ACTIVE",
      },
    });
  });

  it("should not be able to register with the same email", async () => {
    const company = await db.company.create({
      data: {
        name: `company test - ${randomUUID()}`,
      },
    });
  
    // Registro inicial com o email
    await request(app.server).post("/auth/sign-up").send({
      name: "user test",
      email: "userTest@email.com",
      password: "qwertyuio",
      phone: "9999999999",
      companyId: company.id,
    });
  
    // Tentativa de registro com o mesmo email
    const response = await request(app.server).post("/auth/sign-up").send({
      name: "user test",
      email: "userTest@email.com",
      password: "qwertyuio",
      phone: "9999999999",
      companyId: company.id,
    });
  
    expect(response.status).toBe(409);
  });
  
});
