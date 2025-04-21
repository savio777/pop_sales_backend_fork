import { mockUserRepository } from "@/test/mocks/mockRepositoryJest";
import { UpdateUserUseCase } from "./updateUserUseCase";
import { mockUser } from "@/test/mocks/mockEntities";

describe("update user usecase", () => {
  let sut: UpdateUserUseCase;

  beforeEach(() => {
    sut = new UpdateUserUseCase(
      mockUserRepository as any,
    );
    jest.clearAllMocks();
  });

  it("should update a user", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockUserRepository.update.mockResolvedValue(mockUser); 

    const { user } = await sut.execute({ userId: mockUser.id, data: { name: "new name" } });

    expect(user).not.toHaveProperty("password");

    const { password, ...mockUserWithoutPassword } = mockUser;
    expect(user).toMatchObject(mockUserWithoutPassword);
  })

})