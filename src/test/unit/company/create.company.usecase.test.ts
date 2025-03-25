import { BadRequestError } from "@/error/badRequest.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { CreateCompanyUseCase } from "@/usecase/company/createCompanyUseCase";
import { beforeEach, describe, expect, it } from "vitest";

describe("Create company usecase", () => {
  let sut: CreateCompanyUseCase
  let companyRepository: InMemoryCompanyRepository;
  

  beforeEach(async () => {
    companyRepository = new InMemoryCompanyRepository();

    sut = new CreateCompanyUseCase(
      companyRepository
    );
  });

  it("should be able create company", async () => {
    const comapanyName = "teste company"

    const result = await sut.execute({
      name:comapanyName
    })

    expect(result).toMatchObject({
      company: {
        id: expect.any(String),
        name: comapanyName,
      }
    })
  })

  it("should not be able create company with the same name", async () => {
    const comapanyName = "teste company"

    await companyRepository.create({
      name: comapanyName
    })

    await expect(
      sut.execute({
        name: comapanyName
      })
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})