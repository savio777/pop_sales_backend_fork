import { NotFoundError } from "@/error/notfound.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { GetRotationByIdUseCase } from "@/usecase/rotation/getRotationByIdUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Get rotation by Id", async () => {
  let sut: GetRotationByIdUseCase
  let rotationRepository: InMemoryRotationRepository
  let companyRepository: InMemoryCompanyRepository

  beforeEach(async () => {
    rotationRepository = new InMemoryRotationRepository()
    companyRepository = new InMemoryCompanyRepository

    sut = new GetRotationByIdUseCase(
      rotationRepository
    )
  })

  it("should be able get rotation by id", async () => {
    const company = await companyRepository.create({
      name: "company test"
    })
    const rotation = await rotationRepository.create({companyId: company.id})

    const result = await sut.execute(rotation.id)

    expect(result).toMatchObject({
      rotation: {
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }
    })
  })

  it("should not be able get rotation with id not exist", async () => {
    const rotationIdNOtExist = randomUUID()

    await expect(
      sut.execute(rotationIdNOtExist)
    ).rejects.instanceOf(NotFoundError)
  })
})