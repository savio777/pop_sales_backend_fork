import { app } from "@/app";
import Request from "supertest";
import { signInUseradmin } from "./signInUserAdmin";

export async function getClientById(id: string) {
  const {token} = await signInUseradmin()

  const request = {
    id
  }
  const response = await Request(app.server)
  .get(`/client/${id}`)
  .set("Authorization", `Bearer ${token}`)

  return {request, response};
}