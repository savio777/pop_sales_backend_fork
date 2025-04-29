import { mockCompanyRepository } from "@/test/mocks/mockRepositoryJest";
import { FindCompanyByNameUseCase } from "./findCompanyByNameUseCase";
import { mockCompany } from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";

describe("find company by name usecae", () => {
  let sut: FindCompanyByNameUseCase;

  beforeEach(() => {
    sut = new FindCompanyByNameUseCase(mockCompanyRepository as any);
    jest.clearAllMocks();
  });

  it("should be able find company by name", async () => {
    mockCompanyRepository.findByName.mockResolvedValue(mockCompany);

    const { company } = await sut.execute("company");
    expect(company).toEqual(mockCompany);
  });

  it("should not be able find company by name if not exists", async () => {
    mockCompanyRepository.findByName.mockResolvedValue(null);

    await expect(
      sut.execute("company")
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
