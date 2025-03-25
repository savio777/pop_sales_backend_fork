import { NotFoundError } from "@/error/notfound.error";
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

  beforeEach(() => {
    stopRepository = new InMemoryStopRepositoy()
    rotationRepository = new InMemoryRotationRepository()
    companyRepository = new InMemoryCompanyRepository()
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

    await stopRepository.create({
      address: "address test",
      sequence: 1,
      Rotation: {
        connect: {
          id: rotation.id
        }
      }
    })

    const result = await sut.execute(rotation.id)

    expect(result).toMatchObject({
      stops: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          address: "address test",
          sequence: 1,
          rotationId: rotation.id
        })
      ])
    })
    
  })

  it("should not be able list if id not exist", async () => {
    const rotationNotExistId = randomUUID()
    await expect(
      sut.execute(rotationNotExistId)
    ).rejects.instanceOf(NotFoundError)
  })
})