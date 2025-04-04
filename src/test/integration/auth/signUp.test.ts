import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { app } from "@/app";
import { db } from "@/test/setup";
import { randomUUID } from "crypto";
import { generatePhoneNumber } from "@/test/lib/generatePhoneNumber";
import { generateEmail } from "@/test/lib/generateEmail";
import { generatePassword } from "@/test/lib/generatePassword";

describe("Auth sign up", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should create a new user with company", async () => {
    const company = await db.company.create({
      data: { name: `company test ${randomUUID()}` },
    });

    const user = {
      name: `user test ${new Date().getTime()}`,
      email: generateEmail(),
      password: generatePassword(),
      phone: generatePhoneNumber(),
      companyId: company.id,
    };

    const response = await request(app.server).post("/auth/sign-up").send(user);

    // 🔹 Verifica se o usuário foi criado antes de deletar
    const createdUser = await db.user.findUnique({
      where: { id: response.body.user?.id },
    });

    if (createdUser) {
      await db.userCompany.deleteMany({
        where: {
          userId: createdUser.id,
          companyId: company.id,
        },
      });

      await db.user.delete({
        where: { id: createdUser.id },
      });
    }

    // 🔹 Verifica se a empresa ainda existe antes de deletar
    const createdCompany = await db.company.findUnique({
      where: { id: company.id },
    });

    if (createdCompany) {
      await db.company.delete({
        where: { id: company.id },
      });
    }

    expect(response.status).toBe(201);
    expect(response.body.user).toMatchObject({
      id: expect.any(String),
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: "ACTIVE",
    });
  });
});
