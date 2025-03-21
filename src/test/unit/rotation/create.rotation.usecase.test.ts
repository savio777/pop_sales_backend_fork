import { BadRequestError } from "@/error/badRequest.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { CreateRotationUseCase } from "@/usecase/rotation/createRotationUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Create Rotation", async () => {
  let sut: CreateRotationUseCase
  let rotationRepository: InMemoryRotationRepository
  let companyRepository: InMemoryCompanyRepository

  beforeEach(async () => {
    rotationRepository = new InMemoryRotationRepository()
    companyRepository = new  InMemoryCompanyRepository()

    sut = new CreateRotationUseCase(
      rotationRepository,
      companyRepository
    )
  })

  it("should be able create rotation", async () => {
    const company = await companyRepository.create({
      name: "company teste",
    })

    const result = await sut.execute({
      companyId: company.id
    })

    expect(result).toMatchObject({
      rotation: {
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        companyId: company.id
      }
    })
  })

  it("should not be able create company if company not exist", async () => {
    const companyIdNotExist = randomUUID()

    await expect(
      sut.execute({
        companyId: companyIdNotExist
      })
    ).rejects.instanceOf(BadRequestError)
  })
})