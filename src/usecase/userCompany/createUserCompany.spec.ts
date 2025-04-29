import {
  mockCompanyRepository,
  mockUserCompanyRepository,
  mockUserRepository,
} from "@/test/mocks/mockRepositoryJest";
import { CreateUserCompanyUseCase } from "./createUserCompanyUseCase";
import {
  mockCompany,
  mockUser,
  mockUserCompany,
} from "@/test/mocks/mockEntities";

describe("create user company usecase", () => {
  let sut: CreateUserCompanyUseCase;

  beforeEach(() => {
    sut = new CreateUserCompanyUseCase(
      mockUserCompanyRepository as any,
      mockCompanyRepository as any,
      mockUserRepository as any
    );
    jest.clearAllMocks();
  });

  it("should create a user company", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockUserCompanyRepository.getByUserIdAndCompanyId.mockResolvedValue(null);
    mockUserCompanyRepository.create.mockResolvedValue(mockUserCompany);

    const { userCompany } = await sut.execute({
      userId: mockUser.id,
      companyId: mockCompany.id,
    });

    expect(userCompany).toEqual(mockUserCompany);
  });
});
