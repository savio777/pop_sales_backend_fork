import {
  mockCompanyRepository,
  mockFormRepository,
} from "@/test/mocks/mockRepositoryJest";
import { CreateFormUseCase } from "./createFormUseCase";
import { mockCompany, mockFormTemplate } from "@/test/mocks/mockEntities";
import { FormType, QuestionType } from "@prisma/client";
import { NotFoundError } from "@/error/notfound.error";
import { BadRequestError } from "@/error/badRequest.error";

interface CreateForm {
  companyId: string;
  formType: FormType;
  questions: {
    required: boolean;
    text: string;
    type: QuestionType;
  }[];
}

let createForm: CreateForm = {
  companyId: mockCompany.id,
  formType: "CLIENT",
  questions: [
    {
      required: true,
      text: "Qual o seu nome?",
      type: "TEXT",
    },
  ],
};

describe("create form usecase", () => {
  let sut: CreateFormUseCase;

  beforeEach(() => {
    sut = new CreateFormUseCase(
      mockFormRepository as any,
      mockCompanyRepository as any
    );
    jest.clearAllMocks();
  });

  it("should not be able to create form if company does not exist", async () => {
    mockCompanyRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(createForm)).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should not be able to create form if questions is empty", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);
    mockFormRepository.create.mockResolvedValue(mockFormTemplate);

    await expect(
      sut.execute({
        ...createForm,
        questions: [],
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it("should be able to create form", async () => {
    mockCompanyRepository.getById.mockResolvedValue(mockCompany);

    const { form } = await sut.execute(createForm);

    expect(form).toEqual(mockFormTemplate);
  });
});
