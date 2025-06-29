import {
  FormEntry,
  FormTemplate,
  FormType,
  Prisma,
  QuestionType,
} from "@prisma/client";

interface CreateForm {
  formType?: FormType;
  companyId: string;
}

interface CreateQuestion {
  text: string;
  required: boolean;
  type: QuestionType;
}

interface Answer {
  questionId: string;
  text: string;
  imageUrl?: string;
}

type FormTemplateWithEntries = Prisma.FormTemplateGetPayload<{
  include: {
    questions: true;
    formEntries: {
      include: {
        answers: true;
        formTemplate: {
          include: {
            questions: true;
          };
        };
      };
    };
  };
}>;

type GetFormEntryByUserId = Prisma.FormEntryGetPayload<{
  include: {
    answers: true;
    formTemplate: {
      include: {
        questions: true;
        formEntries: {
          include: {
            answers: true;
            formTemplate: {
              include: {
                questions: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export interface FormRepository {
  create({
    form,
    questions,
  }: {
    form: CreateForm;
    questions: CreateQuestion[];
  }): Promise<FormTemplate>;

  createFormEntry({
    formId,
    answers,
    userId,
    companyId,
    taskId,
  }: {
    formId: string;
    answers: Answer[];
    userId?: string;
    companyId: string;
    taskId?: string;
  }): Promise<FormEntry | null>;

  getById(id: string): Promise<FormTemplate | null>;

  listByUserId(userId: string): Promise<GetFormEntryByUserId[]>;

  delete(id: string): Promise<FormTemplate>;
  
  update({
    formId,
    form,
    questions,
  }: {
    formId: string;
    form: CreateForm;
    questions: CreateQuestion[];
  }): Promise<FormTemplate>;

  listByCompanyId(companyId: string): Promise<FormTemplate[]>;

  getFormEntryDetails({
    companyId,
    taskId,
    userId,
  }: {
    companyId: string;
    taskId: string;
    userId: string;
  }): Promise<FormEntry | null>;

  getEntryById(id: string): Promise<FormEntry | null>;
  listEntryByFormId(id: string): Promise<FormTemplateWithEntries | null>;
}
