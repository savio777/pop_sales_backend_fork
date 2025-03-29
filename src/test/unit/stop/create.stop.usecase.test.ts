import { BadRequestError } from "@/error/badRequest.error";
import { InMemoryClientRepository } from "@/repository/inMemory/inMemoryClientRepository";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { InMemoryStopRepositoy } from "@/repository/inMemory/inMemoryStopRepository";
import { CreateStopUseCase } from "@/usecase/stop/createStopUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Create stop usecase", async () => {
  let sut: CreateStopUseCase
  let stopRepository: InMemoryStopRepositoy
  let rotationRepository: InMemoryRotationRepository
  let companyRepository: InMemoryCompanyRepository
  let clientRepository: InMemoryClientRepository

  beforeEach(async () => {
    stopRepository = new InMemoryStopRepositoy()
    rotationRepository = new InMemoryRotationRepository()
    companyRepository = new InMemoryCompanyRepository()
    clientRepository = new InMemoryClientRepository()

    sut = new CreateStopUseCase(
      stopRepository,
      rotationRepository,
      clientRepository
    )
  })

  it("should be able create stop", async () => {
    const company = await companyRepository.create({
      name: "company test"
    })

    const rotation = await rotationRepository.create({
      companyId: company.id,
      description: "rotation test"
    })

    const client = await clientRepository.create({
      name: "client test",
    })

    const result = await sut.execute({
      rotationId: rotation.id,
      clientId: client.id,
      sequence: 1
    })

    expect(result).toMatchObject({
      stop: {
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        address: "address test",
        sequence: 1,
      }
    })
  })

  it("should not be able create stop with rotation not fould", async () => {
    const rotationIdNotFould = randomUUID()

    const client = await clientRepository.create({
      name: "client test",
    })

    await expect(
      sut.execute({
        rotationId: rotationIdNotFould,
        clientId: client.id,
        sequence: 1
      })
    ).rejects.instanceOf(BadRequestError)
  })
})