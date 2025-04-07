import Request from "supertest"
import {app} from "@/app"
import { createCompany } from "./createCompany"
import { signUpUser } from "./signUpUser"
import { signInUser } from "./signInUser"
import { createClient } from "./createClient"

//TODO: lembrar de criar teste para criar usuario e adicionar roles de usuario para ele

export async function checkIn(){
  const company = await createCompany()
  const client = await createClient(company.response.body.company.id)
  const user = await signUpUser(company.response.body.company.id)
  const rotation = await createRotation({
    companyId: company.response.body.company.id,
    userId: user.response.body.user.id,
  })
  const stop = await createStop({
    clientId: client.response.body.client.id,
    rotationId: ""
  })

  const {response}= await signInUser({
    email: user.request.email,
    password: user.request.password,
  })

  const {token} = response.body

  console.log(token)

  const checkIn = await Request(app.server)
  .post("/check-in/")
  .send({
    clientId: client.response.body.client.id,
    lat: client.request.lat,
    lon: client.request.lon,
    stopId: ""
  })
  .set("Authorization", `Bearar ${token}`)
}