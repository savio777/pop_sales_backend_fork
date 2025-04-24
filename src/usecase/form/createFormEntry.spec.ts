import {
  mockCompanyRepository,
  mockFormRepository,
  mockUserRepository,
} from "@/test/mocks/mockRepositoryJest";
import { CreateFormEntryUseCase } from "./createFormEntryUseCase";
import {
  mockCompany,
  mockFormEntry,
  mockFormTemplate,
  mockTask,
  mockUser,
} from "@/test/mocks/mockEntities";
import { randomUUID } from "crypto";
import { NotFoundError } from "@/error/notfound.error";

describe("create form entry usecase", () => {
  let sut: CreateFormEntryUseCase;

  interface Answer {
    questionId: string;
    text: string;
    imageUrl?: string;
  }

  interface CreateFormEntry {
    formId: string;
    answers: Answer[];
    userId?: string;
    companyId: string;
    taskId?: string;
  }

  let mockCreateFormEntry: CreateFormEntry = {
    companyId: mockCompany.id,
    formId: randomUUID(),
    taskId: mockTask.id,
    answers: [
      {
        questionId: randomUUID(),
        text: "answer teste",
      },
    ],
  };

  beforeEach(() => {
    sut = new CreateFormEntryUseCase(
      mockFormRepository as any,
      mockCompanyRepository as any,
      mockUserRepository as any
    );
    jest.clearAllMocks();
  });

  it("should not be able to create a form entry id company does not exist", async () => {
    mockCompanyRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(mockCreateFormEntry)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });

  it("should not be able to create a form entry if user does not exist", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockUserRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(mockCreateFormEntry)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });

  it("should not be able to create a form entry if form template does not exist", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockFormRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(mockCreateFormEntry)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });

  it("should be able to create a form entry", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockFormRepository.getById.mockResolvedValue(mockFormTemplate);
    mockFormRepository.createFormEntry.mockResolvedValue(mockFormEntry);

    const { formEntry } = await sut.execute(mockCreateFormEntry);

    expect(formEntry).toEqual({
      id: mockFormEntry.id,
      formId: mockFormEntry.formTemplateId,
      companyId: mockFormEntry.companyId,
      taskId: mockFormEntry.taskId,
      userId: mockFormEntry.userId,
    });
  });
});
