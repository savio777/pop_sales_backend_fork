import { mockCompanyRepository } from "@/test/mocks/mockRepositoryJest";
import { GetCompanyByIdUseCase } from "./getCompanyByIdUseCase";
import { mockCompany } from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";

describe("get company by id", () => {
  let sut: GetCompanyByIdUseCase;

  beforeEach(() => {
    sut = new GetCompanyByIdUseCase(mockCompanyRepository as any);
    jest.clearAllMocks();
  });

  it("should be able get company by id", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);

    const { company } = await sut.execute(mockCompany.id);

    expect(company).toEqual(mockCompany);
  });

  it("should not be able get company if not exists", async () => {
    mockCompanyRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(mockCompany.id)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
