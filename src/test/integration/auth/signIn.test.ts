import request from "supertest";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { app } from "@/app";
import { randomUUID } from "crypto";
import { db } from "@/test/setup";
import { generateEmail } from "@/test/lib/generateEmail";
import { generatePhoneNumber } from "@/test/lib/generatePhoneNumber";
import { generatePassword } from "@/test/lib/generatePassword";

describe("Auth sign in", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to authenticate user", async () => {
    const company = await db.company.create({
      data: {
        name: `company test - ${randomUUID()}`,
      },
    });
  
    const user = {
      name: `user test ${new Date().getTime()}`,
      email: generateEmail(),
      password: generatePassword(),
      phone: generatePhoneNumber(),
      companyId: company.id,
    };
  
    const userCreated = await request(app.server).post("/auth/sign-up").send(user);
  
    const response = await request(app.server).post("/auth/sign-in").send({
      email: user.email,
      password: user.password,
    });
  
    try {
      if (userCreated.body?.user?.id) {
        const userId = userCreated.body.user.id;
  
        // Deleta userCompany (se existir)
        const userCompanyExists = await db.userCompany.findFirst({
          where: { userId, companyId: company.id },
        });
  
        if (userCompanyExists) {
          await db.userCompany.deleteMany({
            where: { userId, companyId: company.id },
          });
        }
  
        // Deleta usuário (se existir)
        const userExists = await db.user.findUnique({
          where: { id: userId },
        });
  
        if (userExists) {
          await db.user.delete({ where: { id: userId } });
        }
      }
  
      // Deleta empresa (se existir)
      const companyExists = await db.company.findUnique({
        where: { id: company.id },
      });
  
      if (companyExists) {
        await db.company.delete({ where: { id: company.id } });
      }
    } catch (error) {
      console.error("Erro ao apagar dados de teste:", error);
    }
  
    expect(response.status).toBe(200);
    expect(response.body.user).toMatchObject({
      id: expect.any(String),
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: "ACTIVE",
    });
    expect(response.body).toMatchObject({
      token: expect.any(String),
    });
  });
  
});
