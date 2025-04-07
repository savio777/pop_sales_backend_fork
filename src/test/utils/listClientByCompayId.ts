import Request from 'supertest'
import { app } from "@/app";
import { signInUseradmin } from "./signInUserAdmin";

export async function listClientByCompayId(companyId: string) {
  const request = {
    companyId
  }

  const {token} = await signInUseradmin()

  const response = await Request(app.server)
    .get(`/client/company/${companyId}`)
    .set("Authorization", `Bearer ${token}`)

  return {request, response}
}