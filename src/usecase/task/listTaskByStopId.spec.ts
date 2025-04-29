import {
  mockStopRepository,
  mockTaskRepository,
} from "@/test/mocks/mockRepositoryJest";
import { ListTaskByStopIdUseCase } from "./listTaskByStopIdUseCase";
import { mockStop, mockTask } from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";

describe("list task by stop id usecase", () => {
  let sut: ListTaskByStopIdUseCase;

  beforeEach(() => {
    sut = new ListTaskByStopIdUseCase(
      mockTaskRepository as any,
      mockStopRepository as any
    );
    jest.clearAllMocks();
  });

  it("should list tasks by stop id", async () => {
    mockStopRepository.getById.mockResolvedValue(mockStop);
    mockTaskRepository.listByStopId.mockResolvedValue([mockTask]);

    const { tasks } = await sut.execute({
      stopId: mockStop.id,
      page: 1,
      limit: 10,
    });

    expect(tasks).toEqual([mockTask]);
  });

  it("should throw not found error if stop is not found", async () => {
    mockStopRepository.getById.mockResolvedValue(null);

    await expect(
      sut.execute({
        stopId: mockStop.id,
        page: 1,
        limit: 10,
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
