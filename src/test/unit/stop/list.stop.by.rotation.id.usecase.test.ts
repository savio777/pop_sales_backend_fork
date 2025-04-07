import { NotFoundError } from "@/error/notfound.error";
import { InMemoryClientRepository } from "@/repository/inMemory/inMemoryClientRepository";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { InMemoryStopRepositoy } from "@/repository/inMemory/inMemoryStopRepository";
import { ListStopByRotationIdUseCase } from "@/usecase/stop/listStopByRotationIdUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("List stop usecase", async () => {
  let sut: ListStopByRotationIdUseCase
  let stopRepository: InMemoryStopRepositoy
  let rotationRepository: InMemoryRotationRepository
  let companyRepository: InMemoryCompanyRepository
  let clientRepository: InMemoryClientRepository

  beforeEach(() => {
    stopRepository = new InMemoryStopRepositoy()
    rotationRepository = new InMemoryRotationRepository()
    companyRepository = new InMemoryCompanyRepository()
    clientRepository = new InMemoryClientRepository()

    sut = new ListStopByRotationIdUseCase(
      stopRepository
    )
  })

  it("should be able list stops", async () => {
    const company = await companyRepository.create({
      name: "company test"
    })

    const rotation = await rotationRepository.create({
      companyId: company.id,
      description: "rotation test",
    })

    const client = await clientRepository.create({
      name: "client test"
    })

    await stopRepository.create({
      client: {connect: {id: client.id}},
      sequence: 1,
      Rotation: {connect: {id: rotation.id}}
    })

    const result = await sut.execute(rotation.id)


    expect(result).toMatchObject({
      stops: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          sequence: 1,
          status: "PENDING",
          rotationId: rotation.id
        })
      ])
    })
    
  })

  it("should not be able list if id does not exist", async () => {
    const rotationNotExistId = randomUUID()
    await expect(
      sut.execute(rotationNotExistId)
    ).rejects.instanceOf(NotFoundError)
  })
})