import { NotFoundError } from "@/error/notfound.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { UpdateCompanyUseCase } from "@/usecase/company/updateCompanyUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Update company", () => {
  let sut: UpdateCompanyUseCase
  let companyRepository: InMemoryCompanyRepository;

  beforeEach(async () => {
    companyRepository = new InMemoryCompanyRepository();

    sut = new UpdateCompanyUseCase(
      companyRepository
    );
  });

  it("should be able update company", async () => {
    const companyName = "company test"

    const company = await companyRepository.create({
      name: companyName,
      status: "ACTIVE"
    })

    const result = await sut.execute({
      id: company.id,
      status: "INACTIVE"
    })
 
    expect(result).toMatchObject({
      company: {
        id: expect.any(String),
        name: companyName,
        status: "INACTIVE"
      }
    })
  })

  it("should be not able update if company does not exist", async () => {
    const companyNotExist = randomUUID()
 
    await expect(
      sut.execute({
        id: companyNotExist,
        status: "INACTIVE"
      })
    ).rejects.instanceOf(NotFoundError)
  })
})