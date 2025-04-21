import { mockUserRepository } from "@/test/mocks/mockRepositoryJest";
import { GetUserByIdUseCase } from "./getUserByIdUseCase";
import { mockUser } from "@/test/mocks/mockEntities";

describe("get user by id usecase", () => {
  let sut: GetUserByIdUseCase;

  beforeEach(() => {
    sut = new GetUserByIdUseCase(
      mockUserRepository as any,
    );
    jest.clearAllMocks();
  });

  it("should get a user by id", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);

    const { user } = await sut.execute(mockUser.id);

    expect(user).toEqual(mockUser);
  });
})