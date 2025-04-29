import {
  mockRotationRepository,
  mockUserRepository,
  mockUserRotationRepository,
} from "@/test/mocks/mockRepositoryJest";
import { CreateUserRotationUseCase } from "./createUserRotationUseCase";
import {
  mockRotation,
  mockUser,
  mockUserRotation,
} from "@/test/mocks/mockEntities";

describe("create user rotation usecase", () => {
  let sut: CreateUserRotationUseCase;

  beforeEach(() => {
    sut = new CreateUserRotationUseCase(
      mockUserRepository as any,
      mockRotationRepository as any,
      mockUserRotationRepository as any
    );
    jest.clearAllMocks();
  });

  it("should create user rotation", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockRotationRepository.getById.mockResolvedValue(mockRotation);
    mockUserRotationRepository.create.mockResolvedValue(mockUserRotation);

    const { userRotation } = await sut.execute({
      userId: mockUser.id,
      rotationId: mockRotation.id,
    });

    expect(userRotation).toEqual(mockUserRotation);
  });
});
