import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { app } from "@/app";
import { db } from "@/test/setup";
import { createCompany } from "@/test/utils/createCompany";
import { signUpUser } from "@/test/utils/signUpUser";

describe("Auth sign up", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should create a new user with company", async () => {
    const company = await createCompany();
    const { response } = await signUpUser(company.response.body.company.id);

    await db.userCompany.deleteMany({
      where: {
        userId: response.body.user.id,
      },
    });

    await db.company.delete({
      where: {
        id: company.response.body.company.id,
      },
    });

    await db.user.delete({
      where: {
        id: response.body.user.id,
      },
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toMatchObject({
      id: expect.any(String),
      name: response.body.user.name,
      email: response.body.user.email,
      phone: response.body.user.phone,
      status: "ACTIVE",
    });
  });
});
