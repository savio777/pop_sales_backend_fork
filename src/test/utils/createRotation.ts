import { signInUseradmin } from "./signInUserAdmin";
import Request from "supertest"
import { app } from "@/app";

export async function createRotation(
  {clientId, rotationId}:
  {clientId: string, rotationId: string}
) {
  const {token} = await signInUseradmin()

  const request = {
    rotationId,
    sequence: 1,
    clientId,
  }

  const response = await Request(app.server)
    .post("/stop")
    .send(request)
    .set('Authorization', `Bearer ${token}`)

  return {request, response}

}