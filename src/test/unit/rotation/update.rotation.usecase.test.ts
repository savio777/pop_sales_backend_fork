import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { InMemoryUserRepository } from "@/repository/inMemory/inMemoryUserRepository";
import { UpdateRotationUseCase } from "@/usecase/rotation/updationRotationUseCase";
import { beforeEach, describe, expect, it } from "vitest";

describe("Update rotation", async () => {
  let sut: UpdateRotationUseCase;
  let rotationRepository: InMemoryRotationRepository;
  let userRepository: InMemoryUserRepository;
  let companyRepository: InMemoryCompanyRepository;

  beforeEach(async () => {
    rotationRepository = new InMemoryRotationRepository();
    userRepository = new InMemoryUserRepository();
    companyRepository = new InMemoryCompanyRepository();
    sut = new UpdateRotationUseCase(
      rotationRepository,
      userRepository,
      companyRepository
    );
  });

  it("should be able update rotation", async () => {
    const user = await userRepository.create({
      name: "user test",
      email: "usertest@email.com",
      password: "123456"
    })

    const companyA = await companyRepository.create({
      name: "company test 1",
    });

    const companyB = await companyRepository.create({
      name: "company test 2",
    });

    const rotation = await rotationRepository.create(companyA.id);

    const result = await sut.execute({
      id: rotation.id,
      data: {
        companyId: companyB.id,
      },
    });

    expect(result).toMatchObject({
      rotation: {
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        companyId: companyB.id,
      },
    });
  });
});
