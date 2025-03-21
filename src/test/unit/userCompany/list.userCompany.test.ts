import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repository/inMemory/inMemoryUserRepository";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryUserCompanyRepository } from "@/repository/inMemory/inMemoryUserCompanyRepository";
import { ListUserCompanyUseCase } from "@/usecase/userCompany/listUserCompanyUseCase";
import { randomUUID } from "crypto";
import { NotFoundError } from "@/error/notfound.error";

describe("List userCompany use case", () => {
  let sut: ListUserCompanyUseCase;
  let userRepository: InMemoryUserRepository;
  let companyRepository: InMemoryCompanyRepository;
  let userCompanyRepository: InMemoryUserCompanyRepository;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    companyRepository = new InMemoryCompanyRepository();
    userCompanyRepository = new InMemoryUserCompanyRepository();

    sut = new ListUserCompanyUseCase(
      userCompanyRepository,
      companyRepository
    );
  });


  it("should be able list user company", async () => {
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

    const result = await sut.execute({
      companyId: company.id,
      limit: 200,
      page: 1
    })

    expect(result.userCompanies).toMatchObject([
      {
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        companyId: expect.any(String),
        userId: expect.any(String),
      }
    ])
    
  });

  it("should not be able list user with company id not exist", async () => {
    const companyIdNotExist = randomUUID()

    await expect(
      sut.execute({
        companyId: companyIdNotExist,
        limit: 200,
        page: 1
      })
    ).rejects.instanceOf(NotFoundError)
    
  });
});
