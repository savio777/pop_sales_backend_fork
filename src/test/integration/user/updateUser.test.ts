import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from  "supertest"
import { app } from "@/app";
import { beforeEach } from "node:test";
import { db } from "@/test/setup";
import { generateEmail } from "@/test/lib/generateEmail";
import { generatePassword } from "@/test/lib/generatePassword";
import { getToken } from "@/test/lib/getToken";
import { randomUUID } from "crypto";

describe("Update user", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able update user", async () => {
    const token = await getToken()

    const user = await db.user.create({
      data: {
        name: "user update" + randomUUID(),
        email: generateEmail(),
        password: generatePassword()
      }
    })

    const response = await request(app.server)
      .patch(`/user/${user.id}`)
      .send({
        name: "user updated"
      })
      .set("Authorization", `Bearer ${token}`)

    await db.user.delete({where: {id: user.id}})

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          id: expect.any(String),
          name: "user updated",
          email: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          phone: null,
          status: 'ACTIVE'
        })
      })
    )
  })
})