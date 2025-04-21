import { mockTaskRepository } from "@/test/mocks/mockRepositoryJest";
import { GetTaskByIdUseCase } from "./getTaskByIdUseCase";
import { mockTask } from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";

describe("get task by id usecase", () => {
  let sut: GetTaskByIdUseCase;

  beforeEach(() => {
    sut = new GetTaskByIdUseCase(mockTaskRepository as any);
    jest.clearAllMocks();
  });

  it("should get a task", async () => {
    mockTaskRepository.getById.mockResolvedValue(mockTask);

    const { task } = await sut.execute(mockTask.id);

    expect(task).toEqual(mockTask);
  });

  it("should not get a task if task is not found", async () => {
    mockTaskRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(mockTask.id)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
