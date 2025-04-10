import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { app } from "@/app";
import { createCompany } from "@/test/utils/createCompany";
import { signUpUser } from "@/test/utils/signUpUser";
import { signInUser } from "@/test/utils/signInUser";

describe("Auth sign in", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to authenticate user", async () => {
    const company  = await createCompany();
    const userSignUp = await signUpUser(company.response.body.company.id)

    const {response} = await signInUser({
      email: userSignUp.request.email,
      password: userSignUp.request.password,
    })

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      token: expect.any(String),
    })
  });
});
