import {
  mockStopRepository,
  mockTaskRepository,
} from "@/test/mocks/mockRepositoryJest";
import { CreateTaskUseCase } from "./createTaskUseCase";
import { mockStop, mockTask } from "@/test/mocks/mockEntities";
import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";

describe("create task usecase", () => {
  let sut: CreateTaskUseCase;

  beforeEach(() => {
    sut = new CreateTaskUseCase(
      mockTaskRepository as any,
      mockStopRepository as any
    );
    jest.clearAllMocks();
  });

  it("should create a task", async () => {
    mockStopRepository.getById.mockResolvedValue({ ...mockStop, status: "PENDING" });
    mockTaskRepository.create.mockResolvedValue(mockTask);

    const { task } = await sut.execute({
      title: mockTask.title,
      description: mockTask.description,
      stopId: mockStop.id,
    });

    expect(task).toEqual(mockTask);
  });

  it("should not create a task if stop is completed", async () => {
    mockStopRepository.getById.mockResolvedValue(mockStop);

    await expect(
      sut.execute({
        title: mockTask.title,
        description: mockTask.description,
        stopId: mockStop.id,
      })
    ).rejects.toBeInstanceOf(BadRequestError)
  })

  it("should not create a task if stop does not exist", async () => {
    mockStopRepository.getById.mockResolvedValue(null);

    await expect(
      sut.execute({
        title: mockTask.title,
        description: mockTask.description,
        stopId: mockStop.id,
      })
    ).rejects.toBeInstanceOf(NotFoundError)
  })
});
