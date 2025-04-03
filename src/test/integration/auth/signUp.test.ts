import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "@/app";
import { db } from "@/test/setup";
import { randomUUID } from "crypto";
import { generatePhoneNumber } from "@/test/lib/generatePhoneNumber";
import { generateEmail } from "@/test/lib/generateEmail";
import { generatePassword } from "@/test/lib/generatePassword";

describe("Auth sign up", () => {
  beforeEach(async () => {
    await db.userCompany.deleteMany();
    await db.userPermission.deleteMany();
    await db.user.deleteMany();
    await db.company.deleteMany();
  });

  it("should create a new user with company", async () => {
    const company = await db.company.create({
      data: { name: `company test ${randomUUID}` },
    });

    const user = {
      name: `user test ${new Date().getTime()}`,
      email: generateEmail(),
      password: generatePassword(),
      phone: generatePhoneNumber(),
      companyId: company.id,
    };

    const response = await request(app.server).post("/auth/sign-up").send(user);

    expect(response.status).toBe(201);
    expect(response.body.user).toMatchObject({
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: "ACTIVE",
    });
  });
});
