import { BadRequestError } from "@/error/badRequest.error";
import { InMemoryClientRepository } from "@/repository/inMemory/inMemoryClientRepository";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { InMemoryStopRepositoy } from "@/repository/inMemory/inMemoryStopRepository";
import { InMemroyTaskRepository } from "@/repository/inMemory/inMemoryTaskRepository";
import { ListTaskByStopIdUseCase } from "@/usecase/task/listTaskByStopIdUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("List Task Usecase", async () => {
  let sut: ListTaskByStopIdUseCase;
  let taskRepository: InMemroyTaskRepository;
  let stopRepository: InMemoryStopRepositoy;
  let rotationRepository: InMemoryRotationRepository;
  let companyRepository: InMemoryCompanyRepository;
  let clientRepository: InMemoryClientRepository

  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository();
    rotationRepository = new InMemoryRotationRepository();
    taskRepository = new InMemroyTaskRepository();
    stopRepository = new InMemoryStopRepositoy();
    clientRepository = new InMemoryClientRepository()

    sut = new ListTaskByStopIdUseCase(
      taskRepository, 
      stopRepository
    );
  });

  it("should be able list task", async () => {
    const company = await companyRepository.create({
      name: "test",
    });

    const rotation = await rotationRepository.create({
      description: "teste",
      companyId: company.id,
    });

    const client = await clientRepository.create({
      name: "client test"
    })

    const stop = await stopRepository.create({
      client: {connect: {id: client.id}},
      sequence: 1,
      Rotation: {
        connect: {
          id: rotation.id,
        },
      },
    });

    await taskRepository.create({
      title: "test task",
      description: "test",
      Stop: { connect: { id: stop.id } },
    });

    const result = await sut.execute({
      limit: 200,
      page: 1,
      stopId: stop.id
    });

    expect(result).toMatchObject({
      tasks: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt:  expect.any(Date),
          status: "PENDING",
          description: "test",
          title: "test task",
          finishedAt: null,
          stopId: stop.id
        })
      ])
    })
  });

  it("should not be able list if the stopId does not exist", async () => {
    const stopIdNotExist = randomUUID()
    await expect(
      sut.execute({
        limit: 200,
        page: 1,
        stopId: stopIdNotExist
      })
    ).rejects.instanceOf(BadRequestError)
  })
});
