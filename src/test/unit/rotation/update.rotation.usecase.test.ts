import { BadRequestError } from "@/error/badRequest.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryRotationRepository } from "@/repository/inMemory/inMemoryRotationRepository";
import { UpdateRotationUseCase } from "@/usecase/rotation/updationRotationUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Update rotation", async () => {
  let sut: UpdateRotationUseCase;
  let rotationRepository: InMemoryRotationRepository;
  let companyRepository: InMemoryCompanyRepository;

  beforeEach(async () => {
    rotationRepository = new InMemoryRotationRepository();
    companyRepository = new InMemoryCompanyRepository();
    sut = new UpdateRotationUseCase(rotationRepository);
  });

  it("should be able update rotation description", async () => {
    const company = await companyRepository.create({
      name: "company test 1",
    });

    const rotation = await rotationRepository.create({
      companyId: company.id,
      description: "description A",
    });

    const result = await sut.execute({
      id: rotation.id,
      data: {
        description: "description B",
      },
    });

    expect(result).toMatchObject({
      rotation: {
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        description: "description B",
      },
    });
  });

  it("should not be able update rotation if rotation id does not exist", async () => {
    const rotationIdNotExist = randomUUID();
    await expect(
      sut.execute({
        id: rotationIdNotExist,
        data: {
          description: "1234",
        },
      })
    ).rejects.instanceOf(BadRequestError);
  });
});
