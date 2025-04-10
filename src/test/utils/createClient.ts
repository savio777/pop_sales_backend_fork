import { randomUUID } from "crypto"
import { createData } from "./createData"
import { signInUseradmin } from "./signInUserAdmin"
import Request from "supertest"
import { app } from "@/app"

export async function createClient(companyId: string) {
  const {token} = await signInUseradmin()

  const request = {
    name: "client test" + randomUUID(), 
    companyId: companyId, 
    email: createData.email(), 
    lat: createData.lat().toString(), 
    lon: createData.lon().toString(), 
    address: "",
    phoneNumber: createData.phoneNumber(), 
    responsiblePerson: createData.name(), 
    zipCode: createData.zipCode(),
  }

  const response = await Request(app.server)
    .post("/client")
    .send(request)
    .set('Authorization', `Bearer ${token}`)

    return {request, response}
}