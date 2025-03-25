import { NotFoundError } from "@/error/notfound.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { InMemoryStopRepositoy } from "@/repository/inMemory/inMemoryStopRepository";
import { InMemroyTaskRepository } from "@/repository/inMemory/inMemoryTaskRepository";
import { DeleteTaskUseCase } from "@/usecase/task/deleteTaskUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Delete Task Usecase", async () => {
  let sut: DeleteTaskUseCase;
  let taskRepository: InMemroyTaskRepository;
  let stopRepository: InMemoryStopRepositoy;
  let rotationRepository: InMemoryRotationRepository;
  let companyRepository: InMemoryCompanyRepository;

  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository();
    rotationRepository = new InMemoryRotationRepository();
    taskRepository = new InMemroyTaskRepository();
    stopRepository = new InMemoryStopRepositoy();
    sut = new DeleteTaskUseCase(taskRepository);
  });

  it("should be able delete task", async () => {
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

    expect(result).toBeUndefined();

  });

  it("should not be able delete task if the id does not exist", async () => {
    const taskIdNotExist = randomUUID()
    await expect(
      sut.execute(taskIdNotExist)
    ).rejects.instanceOf(NotFoundError)
  })
});
