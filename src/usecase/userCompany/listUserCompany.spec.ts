import {
  mockCompanyRepository,
  mockUserCompanyRepository,
} from "@/test/mocks/mockRepositoryJest";
import { ListUserCompanyUseCase } from "./listUserCompanyUseCase";
import { mockCompany, mockUserCompany } from "@/test/mocks/mockEntities";

describe("list user company usecase", () => {
  let sut: ListUserCompanyUseCase;

  beforeEach(() => {
    sut = new ListUserCompanyUseCase(
      mockUserCompanyRepository as any,
      mockCompanyRepository as any
    );
    jest.clearAllMocks();
  });

  it("should list user company", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockUserCompanyRepository.list.mockResolvedValue([mockUserCompany]);

    const { userCompanies } = await sut.execute({
      companyId: mockCompany.id,
      limit: 10,
      page: 1,
    });

    expect(userCompanies).toEqual([mockUserCompany]);
    expect(mockCompanyRepository.getById).toHaveBeenCalledWith(mockCompany.id);
    expect(mockUserCompanyRepository.list).toHaveBeenCalledWith({
      companyId: mockCompany.id,
      limit: 10,
      page: 1,
    });
  });
});
