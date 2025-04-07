import Request from "supertest";
import { app } from "@/app";
import { signInUseradmin } from "./signInUserAdmin";
import { randomUUID } from "crypto";

export async function createCompany(){
  const adminToken = await signInUseradmin();

  const request = {
    name: "Company Teste " + randomUUID()
  }
  const response = await Request(app.server).post("/company/")
  .set("Authorization", `Bearer ${adminToken.token}`)
  .send(request)

  return {request, response};
}