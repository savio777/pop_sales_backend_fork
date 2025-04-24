import { mockFormRepository } from "@/test/mocks/mockRepositoryJest";
import { DeleteFormUseCase } from "./deleteFormUseCase";
import { mockFormTemplate } from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";

describe("delete form usecase", () => {
  let sut: DeleteFormUseCase;

  beforeEach(() => {
    sut = new DeleteFormUseCase(mockFormRepository as any);
    jest.clearAllMocks();
  });

  it("should not be able to delete a form if it does not exist", async () => {
    mockFormRepository.getById.mockResolvedValueOnce(null);

    await expect(sut.execute("1")).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should be able to delete a form", async () => {
    mockFormRepository.getById.mockResolvedValueOnce(mockFormTemplate);
    mockFormRepository.delete.mockResolvedValueOnce(mockFormTemplate);

    const { form } = await sut.execute(mockFormTemplate.id);

    expect(form).toEqual(mockFormTemplate);
  });
});
