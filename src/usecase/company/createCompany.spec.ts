import { mockCompanyRepository } from "@/test/mocks/mockRepositoryJest";
import { CreateCompanyUseCase } from "./createCompanyUseCase";
import { mockCompany } from "@/test/mocks/mockEntities";
import { BadRequestError } from "@/error/badRequest.error";

describe("create company usecase", () => {
  let sut: CreateCompanyUseCase;

  beforeEach(() => {
    sut = new CreateCompanyUseCase(mockCompanyRepository as any);
    jest.clearAllMocks();
  });

  it("should be able create a company", async () => {
    mockCompanyRepository.findByName.mockResolvedValueOnce(null);
    mockCompanyRepository.create.mockResolvedValueOnce(mockCompany);

    const { company } = await sut.execute(mockCompany);

    expect(company).toEqual(mockCompany);
  });

  it("should not be able create a company if company name already exist", async () => {
    mockCompanyRepository.findByName.mockResolvedValueOnce(mockCompany);

    await expect(sut.execute(mockCompany)).rejects.toBeInstanceOf(
      BadRequestError
    );
  });
});
