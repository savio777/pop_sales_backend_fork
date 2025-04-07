import {expect, describe, it, beforeEach, afterEach} from "vitest"
import request from "supertest"
import { db } from "@/test/setup"
import { getToken } from "@/test/utils/signInUserAdmin"
import { app } from "@/app"

describe("Create Rotarion", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });


  it("should be able create rotation", async () => {
    const token = await getToken()

    const company = await db.company.create({
      data: {
        name: "company test"
      }
    })

    const user = await db.user.create({
      data: {
        name: "user test",
        email: "emailtest@email.com",
        password: "123456"
      }
    })

    const response = await request(app.server)
      .post("/rotation")
      .set("Authorization", `Bearer ${token}`)
      .send({
        companyId: company.id,
        userId: user.id
      })

    await db.company.delete({
      where: {
        id: company.id
      }
    })

    await db.user.delete({
      where: {
        id: user.id
      }
    })

    await db.rotation.delete({
      where: {
        id: response.body.rotation.id
      }
    })

    expect(response.status).toBe(200)
    expect(response.body.rotation).toMatchObject({
      id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      companyId: company.id,
      description: null
    })
  })
})