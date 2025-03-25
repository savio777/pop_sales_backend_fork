import { NotFoundError } from "@/error/notfound.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { InMemoryStopRepositoy } from "@/repository/inMemory/inMemoryStopRepository";
import { InMemroyTaskRepository } from "@/repository/inMemory/inMemoryTaskRepository";
import { DeleteTaskUseCase } from "@/usecase/task/deleteTaskUseCase";
import { GetTaskByIdUseCase } from "@/usecase/task/getTaskByIdUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Get task by Id usecase", async () => {
  let sut: GetTaskByIdUseCase;
  let taskRepository: InMemroyTaskRepository;
  let stopRepository: InMemoryStopRepositoy;
  let rotationRepository: InMemoryRotationRepository;
  let companyRepository: InMemoryCompanyRepository;

  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository();
    rotationRepository = new InMemoryRotationRepository();
    taskRepository = new InMemroyTaskRepository();
    stopRepository = new InMemoryStopRepositoy();
    sut = new GetTaskByIdUseCase(taskRepository);
  });

  it("should be able get task by id", async () => {
    const company = await companyRepository.create({
      name: "test",
    });

    const rotation = await rotationRepository.create({
      description: "teste",
      companyId: company.id,
    });

    const stop = await stopRepository.create({
      address: "test",
      sequence: 1,
      Rotation: {
        connect: {
          id: rotation.id,
        },
      },
    });

    const task = await taskRepository.create({
      title: "test task",
      description: "test",
      Stop: { connect: { id: stop.id } },
    });

    const result = await sut.execute(task.id);

    expect(result).toMatchObject({
      task: {
        id: expect.any(String),
        title: "test task",
        description: "test",
        finishedAt: null,
        status: "PENDING",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        stopId: stop.id
      }
    })
  });

  it("should not be able get task if the id does not exist", async () => {
    const taskIdNotExist = randomUUID()
    await expect(
      sut.execute(taskIdNotExist)
    ).rejects.instanceOf(NotFoundError)
  })
});
