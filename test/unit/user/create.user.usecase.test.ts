import { beforeEach, describe, expect, it } from "vitest"
import { CreateUserUseCase } from "../../../src/usecase/user/createUserUseCase"
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository"
import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository"
import { PrismaUserCompanyRepository } from "@/repository/prisma/prismaUserCompanyRepository"

import "dotenv/config"



describe("Create user use case", () => {
  beforeEach(() => {
    console.log(">>> beforeEach: process.env.NODE_ENV: ", process.env.NODE_ENV)
    console.log(">>> beforeEach: process.env.DATABASE_UR: ", process.env.DATABASE_URL)
  })

  it("should be able to create a new user", async () => {
    
   
    expect(true)

    // TODO: preciso criar os IMemory Databases
  })
})
