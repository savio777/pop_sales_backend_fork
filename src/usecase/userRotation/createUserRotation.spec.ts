import { CreateUserRotationUseCase } from "./createUserRotationUseCase";

describe("create user rotation usecase", () => {
  let sut: CreateUserRotationUseCase;

  beforeEach(() => {
    sut = new CreateUserRotationUseCase(
      mockUserRepository as any,
      mockUserRotationRepository as any
    );
    jest.clearAllMocks();
  });
})