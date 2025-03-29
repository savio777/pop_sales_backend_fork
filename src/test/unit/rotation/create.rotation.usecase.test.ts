import { BadRequestError } from "@/error/badRequest.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { InMemoryUserRepository } from "@/repository/inMemory/inMemoryUserRepository";
import { InMemoryUserRotationRepository } from "@/repository/inMemory/InMemoryUserRotationRepository";
import { CreateRotationUseCase } from "@/usecase/rotation/createRotationUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Create Rotation", async () => {
  let sut: CreateRotationUseCase
  let rotationRepository: InMemoryRotationRepository
  let companyRepository: InMemoryCompanyRepository
  let userRotationRepository: InMemoryUserRotationRepository
  let userRepository: InMemoryUserRepository

  beforeEach(async () => {
    rotationRepository = new InMemoryRotationRepository()
    companyRepository = new  InMemoryCompanyRepository()
    userRotationRepository = new InMemoryUserRotationRepository()
    userRepository = new InMemoryUserRepository()

    sut = new CreateRotationUseCase(
      rotationRepository,
      companyRepository,
      userRotationRepository
    )
  })

  it("should be able create rotation", async () => {
    const company = await companyRepository.create({
      name: "company teste",
    })

    const user = await userRepository.create({
      name: "user test",
      email: "userTest@email.com",
      password: "123123"
    })

    const result = await sut.execute({
      companyId: company.id,
      userId: user.id,
      description: "test rotation create"
    })

    expect(result).toMatchObject({
      rotation: {
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }
    })
  })

  it("should not be able create company if company does not exist", async () => {
    const userIdNotExist = randomUUID()

    const company = await companyRepository.create({
      name: "company teste",
    })

    await expect(
      sut.execute({
        userId: userIdNotExist,
        description: "test",
        companyId: company.id

      })
    ).rejects.instanceOf(BadRequestError)
  })
})