import { mockTaskRepository } from "@/test/mocks/mockRepositoryJest";
import { UpdateTaskUseCase } from "./updateTaskUseCase";
import { mockTask } from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";

describe("update task usecase", () => {
  let sut: UpdateTaskUseCase;

  beforeEach(() => {
    sut = new UpdateTaskUseCase(mockTaskRepository as any);
    jest.clearAllMocks();
  });

  it("should update a task", async () => {
    mockTaskRepository.getById.mockResolvedValue(mockTask);
    mockTaskRepository.update.mockResolvedValue(mockTask);

    const { task } = await sut.execute({
      taskId: mockTask.id,
      data: {
        title: mockTask.title,
        description: mockTask.description,
        status: "PENDING",
        finishedAt: null,
      },
    });

    expect(task).toEqual(mockTask);
  });

  it("should not update a task if task is not found", async () => {
    mockTaskRepository.getById.mockResolvedValue(null);

    await expect(
      sut.execute({
        taskId: mockTask.id,
        data: {
          title: mockTask.title,
          description: mockTask.description,
          status: "PENDING",
          finishedAt: null,
        },
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
