import { mockFormRepository } from "@/test/mocks/mockRepositoryJest";
import { GetFormEntryByIdUseCase } from "./getFormEntryByIdUseCase"
import { mockFormEntry, mockformEntryResponse, mockFormEntryWithRelations } from "@/test/mocks/mockEntities";



describe("get form entry by id", () => {
  let sut: GetFormEntryByIdUseCase;

  beforeEach(() => {
    sut = new GetFormEntryByIdUseCase(mockFormRepository);
    jest.clearAllMocks();
  })
  
  it("should return form entry", async () => {
    mockFormRepository.getEntryById.mockResolvedValue(mockFormEntryWithRelations)

    const {formEntry} = await sut.execute("1");
    expect(formEntry).toEqual(mockformEntryResponse)
  })
})
