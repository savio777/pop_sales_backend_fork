import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
import { InMemoryClientRepository } from "@/repository/inMemory/inMemoryClientRepository";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { InMemoryStopRepositoy } from "@/repository/inMemory/inMemoryStopRepository";
import { InMemroyTaskRepository } from "@/repository/inMemory/inMemoryTaskRepository";
import { CreateTaskUseCase } from "@/usecase/task/createTaskUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Create task", async () => {
  let sut: CreateTaskUseCase
  let taskRepository: InMemroyTaskRepository
  let stopRepository: InMemoryStopRepositoy
  let rotationRepository: InMemoryRotationRepository
  let companyRepository: InMemoryCompanyRepository
  let clientRepository: InMemoryClientRepository

  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository()
    rotationRepository = new InMemoryRotationRepository
    taskRepository = new InMemroyTaskRepository()
    stopRepository = new InMemoryStopRepositoy()
    clientRepository = new InMemoryClientRepository()

    sut = new CreateTaskUseCase(
      taskRepository,
      stopRepository
    )
  })

  it("should be able create task", async () => {
    const company = await companyRepository.create({
      name: "test",
    })

    const rotation = await rotationRepository.create({
      description: "teste",
      companyId: company.id
    })

    const client = await clientRepository.create({
      name: "client test"
    })

    const stop = await stopRepository.create({
      client: {connect: {id: client.id}},
      sequence: 1,
      Rotation: {
        connect: {
          id: rotation.id
        }
      }
    })

    const result = await sut.execute({
      title: "test task",
      description: "test",
      stopId: stop.id
    })

    expect(result).toMatchObject({
      task: {
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt:  expect.any(Date),
        status: "PENDING",
        description: "test",
        title: "test task",
        finishedAt: null,
        stopId: stop.id
      }
    })
  })

  it("should not be able create task with stopId not fould", async () => {
    const stopNotExistId = randomUUID()
    await expect(
      sut.execute({
        stopId: stopNotExistId,
        title: "test"
      })
    ).rejects.instanceOf(NotFoundError)
  })
})