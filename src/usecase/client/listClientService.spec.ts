import { mockClientRepository, mockCompanyRepository } from "@/test/mocks/mockRepositoryJest";
import { ListClientServiceUseCase } from "./ListClientServiceUseCase";
import { mockClientService, mockCompany } from "@/test/mocks/mockEntities";

describe("list client service usecase", () => {
  let sut: ListClientServiceUseCase;

  beforeEach(() => {
    sut = new ListClientServiceUseCase(
      mockCompanyRepository as any,
      mockClientRepository as any
    );
    jest.clearAllMocks();
  });

  it("should list client service", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockClientRepository.listClientService.mockResolvedValue([mockClientService]);

    const result = await sut.execute({
      companyId: mockCompany.id,
    });

    expect(result.clientService).toEqual([mockClientService]);
    expect(mockClientRepository.listClientService).toHaveBeenCalledWith(mockCompany.id);
    expect(mockCompanyRepository.getById).toHaveBeenCalledWith(mockCompany.id);
  });
});