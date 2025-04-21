import { mockCompany } from "@/test/mocks/mockCompany";
import { CreateUserUseCase } from "./createUserUseCase";
import { mockUser } from "@/test/mocks/mockUser";
import { mockUserCompany } from "@/test/mocks/mockUserCompany";

const mockUserRepository = {
  create: jest.fn(),
  getByEmail: jest.fn(),
};

const mockCompanyRepository = {
  getById: jest.fn(),
};

const mockUserCompanyRepository = {
  create: jest.fn(),
};

describe("Create User", () => {
  let sut: CreateUserUseCase;

  beforeEach(() => {
    sut = new CreateUserUseCase(
      mockUserRepository as any,
      mockCompanyRepository as any,
      mockUserCompanyRepository as any
    );
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockUserRepository.getByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue(mockUser);
    mockUserCompanyRepository.create.mockResolvedValue(mockUserCompany);

    const { user } = await sut.execute({
      name: mockUser.name,
      email: mockUser.email,
      password: mockUser.password,
      companyId: mockCompany.id,
    });

    expect(user).toEqual(mockUser);
  });
});
