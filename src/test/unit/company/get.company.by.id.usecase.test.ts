import { NotFoundError } from "@/error/notfound.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { GetCompanyByIdUseCase } from "@/usecase/company/getCompanyByIdUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Get company by id", () => {
  let sut: GetCompanyByIdUseCase
  let companyRepository: InMemoryCompanyRepository;

  beforeEach(async () => {
    companyRepository = new InMemoryCompanyRepository();

    sut = new GetCompanyByIdUseCase(
      companyRepository
    );
  });

  it("should be able get company by id", async () => {
    const companyName = "company test"

    const company = await companyRepository.create({
      name: companyName
    })

    const result = await sut.execute(company.id)
 
    expect(result).toMatchObject({
      company: {
        id: expect.any(String),
        name: companyName
      }
    })
  })

  it("should not be able get user with id not exist", async () => {
    const companyId = randomUUID()
    await expect(
      sut.execute(companyId)
    ).rejects.instanceOf(NotFoundError)
  })

})