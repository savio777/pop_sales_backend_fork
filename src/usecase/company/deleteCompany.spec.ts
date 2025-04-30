import { mockCompanyRepository } from "@/test/mocks/mockRepositoryJest";
import { DeleteCompanyUseCase } from "./deleteCompanyUseCase";
import { mockCompany } from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";

describe("delete company usecase", () => {
  let sut: DeleteCompanyUseCase;

  beforeEach(() => {
    sut = new DeleteCompanyUseCase(mockCompanyRepository as any);
    jest.clearAllMocks();
  });

  it("should be able to delete company", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockCompanyRepository.delete.mockResolvedValue(mockCompany);
    const { company } = await sut.execute("1");

    expect(company).toEqual(mockCompany);
  });

  it("should not be able to delete company if company does not exist", async () => {
    mockCompanyRepository.getById.mockResolvedValue(null);
    await expect(sut.execute("1")).rejects.toBeInstanceOf(NotFoundError);
  });
});
