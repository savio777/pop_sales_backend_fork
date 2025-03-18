import { randomUUID } from "crypto";
import { CreateUserUseCase } from "../../../usecase/user/createUserUseCase";
import { beforeEach, describe, expect, it } from "vitest";
import { BadRequestError } from "@/error/badRequest.error";
import { ConflictError } from "@/error/conflict.error";
import { InMemoryUserRepository } from "@/repository/inMemory/inMemoryUserRepository";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryUserCompanyRepository } from "@/repository/inMemory/inMemoryUserCompanyRepository";

describe("Create user use case", () => {
  let sut: CreateUserUseCase;
  let userRepository: InMemoryUserRepository;
  let companyRepository: InMemoryCompanyRepository;
  let userCompanyRepository: InMemoryUserCompanyRepository;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    companyRepository = new InMemoryCompanyRepository();
    userCompanyRepository = new InMemoryUserCompanyRepository();

    sut = new CreateUserUseCase(
      userRepository,
      companyRepository,
      userCompanyRepository
    );
  });


  it("should be able to create a new user", async () => {
    const company = await companyRepository.create({
      name: "Company Test",
      status: "ACTIVE"
    });

    const email = "teste@email.com";
    const name = "test";
    const password = "test";
    const phone = "99999999";

    const result = await sut.execute({
      companyId: company.id,
      email,
      name,
      password,
      phone,
    });

    expect(result).toMatchObject({
      user: {
        id: expect.any(String),
        email,
        name,
        phone,
      },
    });
  });

  it("should not be able to create a new user if company does not exist", async () => {
    const email = "teste@email.com";
    const name = "test";
    const password = "test";
    const phone = "99999999";
    const companyIdNotExist = randomUUID();

    await expect(
      sut.execute({
        companyId: companyIdNotExist,
        email,
        name,
        password,
        phone,
      })
    ).rejects.toThrow(BadRequestError);
  });

  it("should not be able to create a new user with email already exist", async () => {
    const company = await companyRepository.create({
      name: "Company Test",
      status: "ACTIVE"
    });

    const email = "teste@email.com";
    const name = "test";
    const password = "test";
    const phone = "99999999";

    await sut.execute({
      companyId: company.id,
      email,
      name,
      password,
      phone,
    });

    await expect(
      sut.execute({
        companyId: company.id,
        email,
        name,
        password,
        phone,
      })
    ).rejects.toThrow(ConflictError); 
  });
});
