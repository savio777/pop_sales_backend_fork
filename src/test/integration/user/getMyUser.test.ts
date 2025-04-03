import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { getToken } from "@/test/lib/getToken";

describe("Get My User", () => {

  it("should be able to create company", async () => {
    const token = await getToken(); 

    const response = await request(app.server)
      .get("/user")
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          id: expect.any(String),
          name: 'admin',
          email: 'admin@email.com',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          phone: null,
          status: 'ACTIVE'
        })
      })
    )
  });
});
