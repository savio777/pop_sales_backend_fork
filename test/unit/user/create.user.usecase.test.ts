import {beforeEach, describe, it} from "vitest"
import {CreateUserUseCase} from "../../../src/usecase/user/createUserUseCase"
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository"
import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository"
import { PrismaUserCompanyRepository } from "@/repository/prisma/prismaUserCompanyRepository"

describe("Create user use case", () => {
  beforeEach(() => {

  })

  it("should be able create a new user", async () => {
    const userRepository = new PrismaUserRepository()
    const companyRepository = new PrismaCompanyRepository()
    const userCompanyRepository = new PrismaUserCompanyRepository()

    const sut = new CreateUserUseCase(
      userRepository,
      companyRepository,
      userCompanyRepository
    )

    //TODO: preciso criar os IMemory Dadabases
  })
})