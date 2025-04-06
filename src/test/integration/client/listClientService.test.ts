import { beforeEach, describe, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { afterEach } from "node:test";
import { getToken } from "@/test/lib/getToken";
import { db } from "@/test/setup";
import { generateEmail } from "@/test/lib/generateEmail";

describe("List Client Service", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to list all clients by company", async () => {
    const tokenAdmin = await getToken();

    const company = await request(app.server)
      .post("/company")
      .send({
        name: "John Doe",
        email: generateEmail(),
        password: "123456",
      })
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const client = await request(app.server)
      .post("/client")
      .send({
        name: "John Doe",
        email: generateEmail(),
        phone: "123456789",
        companyId: company.body.id,
      })
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const userCreated = await request(app.server)
      .post("/auth/sign-up")
      .send({
        name: "John Doe",
        email: generateEmail(),
        password: "123456",
        companyId: company.body.id,
      })
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const userAccess = await request(app.server).post("/auth/sign-in").send({
      email: userCreated.body.email,
      password: "123456",
    });

    const token = userAccess.body.token;

    const rotation = await request(app.server)
      .post("/rotation")
      .send({
        companyId: company.body.id,
        userId: userCreated.body.id,
      })
      .set("Authorization", `Bearer ${tokenAdmin}`);

    //TODO: apos a criação da rota, precisa adicionar userRotation para relacionamento

    const userRotation = await request(app.server)
      .post("/user-rotation")
      .send({
        userId: user.id,
        rotationId: rotation.body.id,
      })
      .set("Authorization", `Bearer ${token}`);

    const checkIn;

    const clientService = await request(app.server)
      .get(`/client-service/${company.id}`)
      .set("Authorization", `Bearer ${token}`);

    console.log(clientService.body);
  });
});
