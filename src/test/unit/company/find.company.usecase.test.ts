import { NotFoundError } from "@/error/notfound.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { FindCompanyByNameUseCase } from "@/usecase/company/findCompanyByNameUseCase";
import { beforeEach, describe, expect, it } from "vitest";

describe("Find company by name", () => {
  let sut: FindCompanyByNameUseCase
  let companyRepository: InMemoryCompanyRepository;

  beforeEach(async () => {
    companyRepository = new InMemoryCompanyRepository();

    sut = new FindCompanyByNameUseCase(
      companyRepository
    );
  });

  it("should be able find company by name", async () => {
    const companyName = "company test"

    await companyRepository.create({
      name: companyName
    })

    const company = await sut.execute(companyName)
 
    expect(company).toMatchObject({
      company: {
        id: expect.any(String),
        name: companyName
      }
    })
  })

  it("should not be able find company with name not exist", async () => {
    await expect(
      sut.execute("company not exist")
    ).rejects.instanceOf(NotFoundError)
  })
})