import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { afterEach, before } from "node:test";
import { app } from "@/app";
import { getToken } from "@/test/utils/signInUserAdmin";
import { generateEmail } from "@/test/utils/generateEmail";
import { db } from "@/lib/prisma";
import { randomUUID } from "crypto";
describe("Create User Rotation", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });
  it("should be able to create a user rotation", async () => {

    const tokenAdmin = await getToken();

    const company = await request(app.server)
      .post("/company")
      .send({
        name: "Company Test" + randomUUID(),
      })
      .set("Authorization", `Bearer ${tokenAdmin}`);

    console.log(">>> company: ", company.body)

    const userAccess = await request(app.server)
     .post("/auth/sign-up")
     .send({
        name: "User Test" + randomUUID(),
        email: generateEmail(),
        password: "123456",
        companyId: company.body.id,
      });

    const userCreated = await request(app.server).post("/auth/sign-up").send({
      name: "User Test" + randomUUID(),
      email: generateEmail(),
      password: "123456",
      companyId: company.body.id,
    });

    const { body: token } = await request(app.server)
      .post("/auth/sign-in")
      .send({
        email: userCreated.body.email,
        password: "123456",
      });

    const rotation = await request(app.server)
      .post("/rotation")
      .send({
        companyId: company.body.id,
        userId: userCreated.body.id,
      })
      .set("Authorization", `Bearer ${tokenAdmin}`);

      console.log(rotation.body)

      await db.userCompany.delete({
        where: {
          userId_companyId: {
            userId: userCreated.body.id,
            companyId: company.body.id,
          }
        }
      })

      await db.userRotation.delete({
        where: {
          userId_rotationId: {
            userId: userCreated.body.id,
            rotationId: rotation.body.id,
          }
        }
      })

      await db.user.delete({
        where: {
          id: userCreated.body.id,
        }
      })

      await db.company.delete({
        where: {
          id: company.body.id,
        }
      })

      expect(rotation.statusCode).toEqual(201);



    
  });
});
