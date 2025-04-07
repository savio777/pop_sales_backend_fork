import { signInUseradmin } from "./signInUserAdmin"
import Request from 'supertest'
import { app } from "@/app";

export async function listClientService(companyId: string) {
  const request = {
    companyId
  }
  const {token} = await signInUseradmin()

  const response = await Request(app.server)
   .get(`/client/company-service/${companyId}`)
   .set("Authorization", `Bearer ${token}`)   
  return {request, response}
}