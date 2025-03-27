import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { BadRequestError } from "@/error/badRequest.error";
import { InMemoryUserRepository } from "@/repository/inMemory/inMemoryUserRepository";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryUserCompanyRepository } from "@/repository/inMemory/inMemoryUserCompanyRepository";
import { CreateUserCompanyUseCase } from "@/usecase/userCompany/createUserCompanyUseCase";

describe("Create userCompany use case", () => {
  let sut: CreateUserCompanyUseCase;
  let userRepository: InMemoryUserRepository;
  let companyRepository: InMemoryCompanyRepository;
  let userCompanyRepository: InMemoryUserCompanyRepository;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    companyRepository = new InMemoryCompanyRepository();
    userCompanyRepository = new InMemoryUserCompanyRepository();

    sut = new CreateUserCompanyUseCase(
      userCompanyRepository,
      companyRepository,
      userRepository
    );
  });


  it("should be able to create userCompany", async () => {
    const company = await companyRepository.create({
      name: "Company Test",
      status: "ACTIVE"
    });

    const user = await userRepository.create({
      name: "teste",
      email: "test@email.com",
      password: "asdfghj"
    })

    const result = await sut.execute({
      userId: user.id,
      companyId: company.id
    })

    expect(result).toMatchObject({
      userCompany: {
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        companyId: company.id,
        userId: user.id
   
      },
    });
  });

  it("should not be able crate userCompany does not exist user id", async () => {
    const user = await userRepository.create({
      name: "teste",
      email: "test@email.com",
      password: "asdfghj"
    })

    const notExistCompanyId = randomUUID()
    await expect(
      sut.execute({
        companyId: notExistCompanyId,
        userId: user.id
      })
    ).rejects.instanceOf(BadRequestError)
  })

  it("should not be able crate userCompany not exist company id", async () => {
    const company = await companyRepository.create({
      name: "Company Test",
      status: "ACTIVE"
    }); 

    const notExistUserId = randomUUID()
    await expect(
      sut.execute({
        companyId: company.id,
        userId: notExistUserId
      })
    ).rejects.instanceOf(BadRequestError)
  })

  it("should not be able crate userCompany already exist", async () => {
    const company = await companyRepository.create({
      name: "Company Test",
      status: "ACTIVE"
    }); 

    const user = await userRepository.create({
      name: "teste",
      email: "test@email.com",
      password: "asdfghj"
    })

    await userCompanyRepository.create({
      companyId: company.id,
      userId: user.id
    })

    await expect(
      sut.execute({
        companyId: company.id,
        userId: user.id
      })
    ).rejects.instanceOf(BadRequestError)
  })
});
