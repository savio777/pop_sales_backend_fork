import { mockCompanyRepository } from "@/test/mocks/mockRepositoryJest";
import { ListCompaniesUseCase } from "./listCompaniesUseCase";
import { mockCompany } from "@/test/mocks/mockEntities";

describe("list companies usecase", () => {
  let sut: ListCompaniesUseCase;

  beforeEach(() => {
    sut = new ListCompaniesUseCase(mockCompanyRepository as any);
    jest.clearAllMocks();
  });

  it("should be able to list companies", async () => {
    mockCompanyRepository.list.mockResolvedValueOnce([mockCompany]);
    const { companies } = await sut.execute();

    expect(companies).toEqual([mockCompany]);
  });
});
