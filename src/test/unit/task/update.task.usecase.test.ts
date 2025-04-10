import { NotFoundError } from "@/error/notfound.error";
import { InMemoryClientRepository } from "@/repository/inMemory/inMemoryClientRepository";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { InMemoryStopRepositoy } from "@/repository/inMemory/inMemoryStopRepository";
import { InMemroyTaskRepository } from "@/repository/inMemory/inMemoryTaskRepository";
import { UpdateTaskUseCase } from "@/usecase/task/updateTaskUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Update task usecase", async () => {
  let sut: UpdateTaskUseCase;
  let taskRepository: InMemroyTaskRepository;
  let stopRepository: InMemoryStopRepositoy;
  let rotationRepository: InMemoryRotationRepository;
  let companyRepository: InMemoryCompanyRepository;
  let clientRepository: InMemoryClientRepository;

  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository();
    rotationRepository = new InMemoryRotationRepository();
    taskRepository = new InMemroyTaskRepository();
    stopRepository = new InMemoryStopRepositoy();
    clientRepository = new InMemoryClientRepository()

    sut = new UpdateTaskUseCase(taskRepository);
  });

  it("should be able update task", async () => {
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

    const task = await taskRepository.create({
      title: "test task",
      description: "test",
      Stop: { connect: { id: stop.id } },
    });

    const result = await sut.execute({
      taskId: task.id,
      data: {
        title: "title updated",
        description: "description updated",
        finishedAt: new Date(),
        status: "COMPLETED",
      },
    });

    expect(result).toMatchObject({
      task: {
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        status: "COMPLETED",
        description: "description updated",
        title: "title updated",
        finishedAt: expect.any(Date),
        stopId: stop.id,
      },
    });
  });

  it("should not be able update task if the taskId does not exist", async () => {
    const taskIdNotExist = randomUUID();
    await expect(
      sut.execute({
        taskId: taskIdNotExist,
        data: {
          title: "test task",
          description: "test",
        },
      })
    ).rejects.instanceOf(NotFoundError);
  });
});
