import {
  mockClientRepository,
  mockRotationRepository,
  mockStopRepository,
} from "@/test/mocks/mockRepositoryJest";
import { CreateStopUseCase } from "./createStopUseCase";
import { mockClient, mockRotation, mockStop } from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";

describe("create stop usecase", () => {
  let sut: CreateStopUseCase;

  beforeEach(() => {
    sut = new CreateStopUseCase(
      mockStopRepository as any,
      mockRotationRepository as any,
      mockClientRepository as any
    );
    jest.clearAllMocks();
  });

  it("should create a stop", async () => {
    mockRotationRepository.getById.mockResolvedValue(mockRotation);
    mockClientRepository.getById.mockResolvedValue(mockClient);
    mockStopRepository.create.mockResolvedValue(mockStop);

    const { stop } = await sut.execute({
      rotationId: mockRotation.id,
      clientId: mockClient.id,
      sequence: mockStop.sequence,
    });

    expect(stop).toEqual(mockStop);
  });

  it("should not create a stop if rotation is not found", async () => {
    mockRotationRepository.getById.mockResolvedValue(null);

    await expect(
      sut.execute({
        rotationId: mockRotation.id,
        clientId: mockClient.id,
        sequence: mockStop.sequence,
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should not create a stop if client is not found", async () => {
    mockRotationRepository.getById.mockResolvedValue(mockRotation);
    mockClientRepository.getById.mockResolvedValue(null);

    await expect(
      sut.execute({
        rotationId: mockRotation.id,
        clientId: mockClient.id,
        sequence: mockStop.sequence,
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
