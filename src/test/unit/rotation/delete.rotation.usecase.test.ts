import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { InMemoryStopRepositoy } from "@/repository/inMemory/inMemoryStopRepository";
import { InMemroyTaskRepository } from "@/repository/inMemory/inMemoryTaskRepository";
import { DeleteRotationUseCase } from "@/usecase/rotation/deleteRotationUseCase";
import { beforeEach, describe, expect, it } from "vitest";

describe("Delete rotation usecase", async () => {
  let sut: DeleteRotationUseCase
  let rotationRepository: InMemoryRotationRepository
  let stopRepository: InMemoryStopRepositoy
  let taskRepository: InMemroyTaskRepository
  let companyRepository: InMemoryCompanyRepository

  beforeEach(async () => {
    rotationRepository = new InMemoryRotationRepository()
    stopRepository = new InMemoryStopRepositoy()
    taskRepository = new InMemroyTaskRepository()
    companyRepository = new InMemoryCompanyRepository()
  
    sut = new DeleteRotationUseCase(
      rotationRepository,
      stopRepository,
      taskRepository
    )
  })

  it("should be able to delete rotation", async () => {
    const company = await companyRepository.create({
      name: "company test"
    });
  
    const rotation = await rotationRepository.create(company.id);
  
    await sut.execute({ rotationId: rotation.id });
  
    const deletedRotation = await rotationRepository.getById(rotation.id);
  
    expect(deletedRotation).toBeNull();
  });
  
})  