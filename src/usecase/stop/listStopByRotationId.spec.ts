import { mockStopRepository } from "@/test/mocks/mockRepositoryJest";
import { ListStopByRotationIdUseCase } from "./listStopByRotationIdUseCase";
import { mockStop } from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";

describe("list stop by rotation id usecase", () => {
  let sut: ListStopByRotationIdUseCase;

  beforeEach(() => {
    sut = new ListStopByRotationIdUseCase(mockStopRepository as any);
    jest.clearAllMocks();
  });

  it("should list stops by rotation id", async () => {
    mockStopRepository.getByRotationId.mockResolvedValue([mockStop]);

    const { stops } = await sut.execute(mockStop.rotationId!);

    expect(stops).toEqual([mockStop]);
  });

  it("should not list stops if rotation id is not found", async () => {
    mockStopRepository.getByRotationId.mockResolvedValue(null);

    await expect(sut.execute(mockStop.rotationId!)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
