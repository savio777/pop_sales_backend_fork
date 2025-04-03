import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { randomUUID } from "crypto";
import { db } from "@/test/setup";
import { getToken } from "@/test/lib/getToken";

describe("Create Company", () => {
  beforeEach(async () => {
    await db.company.deleteMany();
  });
  
  it("should be able to create company", async () => {
    const token = await getToken(); 

    const response = await request(app.server)
      .post("/company")
      .send({
        name: `company test ${randomUUID()}`, 
      })
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
  });
});
