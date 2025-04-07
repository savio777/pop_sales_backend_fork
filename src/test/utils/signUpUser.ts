import Request from "supertest";
import { app } from "@/app";
import { createData } from "./createData";

export async function signUpUser(companyId: string) {

  const request = {
    name: `user test ${new Date().getTime()}`,
    email: createData.email(),
    password: createData.password(),
    phone: createData.phoneNumber(),
    companyId
  }
  const response = await Request(app.server)
    .post("/auth/sign-up")
    .send(request)

  return {request, response}
}