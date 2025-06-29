import {
  mockClientRepository,
  mockCompanyRepository,
} from "@/test/mocks/mockRepositoryJest";
import { CreateClientUseCase } from "./createClientUseCase";
import { mockClient, mockCompany } from "@/test/mocks/mockEntities";

describe("create client usecase", () => {
  let sut: CreateClientUseCase;
  beforeEach(() => {
    sut = new CreateClientUseCase(
      mockClientRepository as any,
      mockCompanyRepository as any
    );
    jest.clearAllMocks();
  });

  it("should create a client", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockClientRepository.getByEmail.mockResolvedValue(null);
    mockClientRepository.getByName.mockResolvedValue(null);
    mockClientRepository.create.mockResolvedValue(mockClient);

    const { client } = await sut.execute({
      name: mockClient.name,
      zipCode: mockClient.zipCode,
      companyId: mockCompany.id,
      address: mockClient.address,
      email: mockClient.email,
      lat: mockClient.lat,
      lon: mockClient.lon,
      phoneNumber: mockClient.phoneNumber,
      responsiblePerson: mockClient.responsiblePerson,
    });

    expect(client).toEqual(mockClient);
  });
});
