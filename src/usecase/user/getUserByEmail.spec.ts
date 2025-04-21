import { mockUser } from "@/test/mocks/mockUser";
import { GetUserByEmailUseCase } from "./getUserByEmailUseCase";

const mockUserRepository = {
  getByEmail: jest.fn(),
};

describe("Get user by email", () => {
  let sut: GetUserByEmailUseCase;

  beforeEach(() => {
    sut = new GetUserByEmailUseCase(mockUserRepository as any);
    jest.clearAllMocks();
  });

  it("should get a user by email", async () => {
    mockUserRepository.getByEmail.mockResolvedValue(mockUser);

    const { user } = await sut.execute(mockUser.email);

    expect(user).toEqual(mockUser);
  });
});
