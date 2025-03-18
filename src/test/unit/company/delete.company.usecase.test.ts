import { BadRequestError } from "@/error/badRequest.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { DeleteCompanyUdeCase } from "@/usecase/company/deleteCompanyUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Delete company usecase", () => {
  let sut: DeleteCompanyUdeCase
  let companyRepository: InMemoryCompanyRepository;
  

  beforeEach(async () => {
    companyRepository = new InMemoryCompanyRepository();

    sut = new DeleteCompanyUdeCase(
      companyRepository
    );
  });

  it("should be able delete company", async () => {
    const company = await companyRepository.create({
      name: "company test"
    })
 
    await expect(
      sut.execute(company.id)
    ).resolves.not.toThrow();

  })

  it("should not be able delete company if id not exist", async () => {
   
    const companyId = randomUUID()

    await expect(
      sut.execute(companyId)
    ).rejects.instanceOf(BadRequestError)

  })

})