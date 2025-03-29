import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repository/inMemory/inMemoryUserRepository";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryUserCompanyRepository } from "@/repository/inMemory/inMemoryUserCompanyRepository";
import { RemoveUserCompanyUseCase } from "@/usecase/userCompany/removeUserCompanyUseCase";
import { randomUUID } from "crypto";
import { NotFoundError } from "@/error/notfound.error";
import { BadRequestError } from "@/error/badRequest.error";

describe("Remove userCompany use case", () => {
  let sut: RemoveUserCompanyUseCase;
  let userRepository: InMemoryUserRepository;
  let companyRepository: InMemoryCompanyRepository;
  let userCompanyRepository: InMemoryUserCompanyRepository;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    companyRepository = new InMemoryCompanyRepository();
    userCompanyRepository = new InMemoryUserCompanyRepository();

    sut = new RemoveUserCompanyUseCase(
      userCompanyRepository,
      userRepository,
      companyRepository
    );
  });

  it("should be able to remove userCompany", async () => {
    const company = await companyRepository.create({
      name: "Company Test",
      status: "ACTIVE",
    });

    const user = await userRepository.create({
      name: "teste",
      email: "test@email.com",
      password: "asdfghj",
    });

    const userCompany = await userCompanyRepository.create({
      userId: user.id,
      companyId: company.id,
    });

    const result = await sut.execute({
      companyId: company.id,
      userId: user.id,
    });

    expect(result).toBeUndefined();
  });

  it("should not be able to remove if the company does not exist", async () => {
    const user = await userRepository.create({
      name: "teste",
      email: "test@email.com",
      password: "asdfghj",
    });

    const companyIdNotExist = randomUUID(); 

    await expect(
      sut.execute({
        companyId: companyIdNotExist,
        userId: user.id,
      })
    ).rejects.toThrowError(new BadRequestError("empresa não existe"));
  });

  it("should not be able to remove if the user does not exist", async () => {
    const company = await companyRepository.create({
      name: "Company Test",
      status: "ACTIVE",
    });

    const userIdNotExist = randomUUID(); 

    await expect(
      sut.execute({
        companyId: company.id,
        userId: userIdNotExist,
      })
    ).rejects.toThrowError(new BadRequestError("usuário não existe"));
  });

  it("should not be able to remove if the user-company relationship does not exist", async () => {
    const company = await companyRepository.create({
      name: "Company Test",
      status: "ACTIVE",
    });

    const user = await userRepository.create({
      name: "teste",
      email: "test@email.com",
      password: "asdfghj",
    });
  
    await expect(
      sut.execute({
        companyId: company.id,
        userId: user.id
      })
    ).rejects.toThrowError(new NotFoundError("User-Company relationship does not exist"));
  });
  
});
