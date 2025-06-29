import { mockCompanyRepository, mockUserCompanyRepository, mockUserRepository } from "@/test/mocks/mockRepositoryJest";
import { DeleteUserCompanyUseCase } from "./deleteUserCompanyUseCase";
import { mockCompany, mockUser, mockUserCompany } from "@/test/mocks/mockEntities";

describe("delete user company usecase", () => {
  let sut: DeleteUserCompanyUseCase;

  beforeEach(() => {
    sut = new DeleteUserCompanyUseCase(
      mockUserCompanyRepository as any,
      mockUserRepository as any,
      mockCompanyRepository as any
    );
    jest.clearAllMocks();
  });

  it("should remove user company", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockUserCompanyRepository.getByUserIdAndCompanyId.mockResolvedValue(mockUserCompany); 
    mockUserCompanyRepository.delete.mockResolvedValue(mockUserCompany); 

    const { userCompany } = await sut.execute({
      userId: mockUser.id,
      companyId: mockCompany.id,
    })

    expect(userCompany).toEqual(mockUserCompany);
    expect(mockCompanyRepository.getById).toHaveBeenCalledWith(mockCompany.id);
    expect(mockUserRepository.getById).toHaveBeenCalledWith(mockUser.id);
  })
})