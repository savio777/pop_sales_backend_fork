import request from "supertest";
import {
  afterAll,
  afterEach,
  beforeAll,
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
    await db.userCompany.deleteMany();
    await db.userPermission.deleteMany();
    await db.user.deleteMany();
    await db.company.deleteMany();
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

    await request(app.server).post("/auth/sign-up").send(user);

    const response = await request(app.server).post("/auth/sign-in").send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
  });
});
