import Request from "supertest";
import { app } from "@/app";

export async function signInUser(
  {email, password}: 
  {email: string, password: string }
){
  const request = {
    email,
    password
  }

  const response = await Request(app.server).post("/auth/sign-in").send({
    email,
    password,
  });

  return {request, response};
}