import { mockFormRepository } from "@/test/mocks/mockRepositoryJest";
import { GetFormByIdUseCase } from "./getFormByIdUseCase";
import { NotFoundError } from "@/error/notfound.error";
import { mockFormTemplate } from "@/test/mocks/mockEntities";

describe("get form by id", () => {
  let sut: GetFormByIdUseCase;

  beforeEach(() => {
    sut = new GetFormByIdUseCase(mockFormRepository as any);
    jest.clearAllMocks();
  });

  it("should not be able to get a form by id if form does not exist", async () => {
    mockFormRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(mockFormTemplate.id)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });

  it("should be able to get a form by id", async () => {
    mockFormRepository.getById.mockResolvedValue(mockFormTemplate);

    const { form } = await sut.execute(mockFormTemplate.id);

    expect(form).toEqual(mockFormTemplate);
  });
});
