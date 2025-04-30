import { mockTaskRepository } from "@/test/mocks/mockRepositoryJest";
import { DeleteTaskUseCase } from "./deleteTaskUseCase";
import { mockTask } from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";

describe("delete task usecase", () => {
  let sut: DeleteTaskUseCase;

  beforeEach(() => {
    sut = new DeleteTaskUseCase(mockTaskRepository as any);
    jest.clearAllMocks();
  });

  it("should delete a task", async () => {
    mockTaskRepository.getById.mockResolvedValue(mockTask);
    mockTaskRepository.delete.mockResolvedValue(mockTask);

    const { task } = await sut.execute(mockTask.id);

    expect(task).toEqual(mockTask);
  });

  it("should not delete a task if task does not exist", async () => {
    mockTaskRepository.getById.mockResolvedValue(null);

    await expect(
      sut.execute(mockTask.id)
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
