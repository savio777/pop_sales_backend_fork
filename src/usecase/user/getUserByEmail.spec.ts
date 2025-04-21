import { mockUser } from "@/test/mocks/mockEntities";
import { mockUserRepository } from "@/test/mocks/mockRepositoryJest";
import { GetUserByEmailUseCase } from "./getUserByEmailUseCase";

describe("get user by email usecase", () => {
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
