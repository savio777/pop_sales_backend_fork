import { mockClientRepository } from "@/test/mocks/mockRepositoryJest";
import { CreateClientUseCase } from "./createClientUseCase";

describe("create client usecase", () => {
  let sut: CreateClientUseCase;
  beforeEach(() => {
    sut = new CreateClientUseCase(mockClientRepository as any);
    jest.clearAllMocks(); 
  })

})