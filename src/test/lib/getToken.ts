import request from "supertest";
import { app } from "@/app";

export async function getToken() {

  const response = await request(app.server).post("/auth/sign-in").send({
    email: process.env.USER_ROOT_EMAIL,
    password: process.env.USER_ROOT_PASSWORD,
  });

  const token = response.body.token;

  return token;
}
