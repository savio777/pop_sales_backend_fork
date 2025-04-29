import { mockCompanyRepository } from "@/test/mocks/mockRepositoryJest";
import { UpdateCompanyUseCase } from "./updateCompanyUseCase";
import { NotFoundError } from "@/error/notfound.error";
import { mockCompany } from "@/test/mocks/mockEntities";
import { BadRequestError } from "@/error/badRequest.error";

describe("update company usecase", () => {
  let sut: UpdateCompanyUseCase;

  beforeEach(() => {
    sut = new UpdateCompanyUseCase(mockCompanyRepository as any);
    jest.clearAllMocks();
  });

  it("should not be able to update if company does not exist", async () => {
    mockCompanyRepository.getById.mockResolvedValue(null);

    await expect(
      sut.execute({
        id: mockCompany.id,
        name: "name update",
        status: "ACTIVE",
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should not be able to update if company name already exist", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockCompanyRepository.findByName.mockResolvedValue(mockCompany);

    await expect(
      sut.execute({
        id: mockCompany.id,
        name: "name update",
        status: "ACTIVE",
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it("should be able to update company", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockCompanyRepository.findByName.mockResolvedValue(null);
    mockCompanyRepository.update.mockResolvedValue({
      ...mockCompany,
      name: "name update",
      status: "ACTIVE",
    });

    const { company } = await sut.execute({
      id: mockCompany.id,
      name: "name update",
      status: "ACTIVE",
    });

    expect(company).toEqual({
      ...mockCompany,
      id: mockCompany.id,
      name: "name update",
      status: "ACTIVE",
    });
  });
});
