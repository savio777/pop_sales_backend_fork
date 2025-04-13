import { FormEntry, FormTemplate, FormType, QuestionType } from "@prisma/client";

interface CreateForm {
  formType: FormType;
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

export interface FormRepository {
  create(
    {form, questions}:
    {form: CreateForm, questions: CreateQuestion[]}
  ): Promise<FormTemplate>;

  createFormEntry(
    { formTemplateId, answers, userId, companyId, taskId}:
    { formTemplateId: string; answers: Answer[]; userId: string, companyId: string, taskId: string }
  ): Promise<FormEntry | null>;

  getById(id: string): Promise<FormTemplate | null>;

  delete(id: string): Promise<void>;

  listByCompanyId(companyId: string): Promise<FormTemplate[]>;

  getFormEntryDetails({
    companyId,
    taskId,
    userId
  }: {
    companyId: string;
    taskId: string;
    userId: string;
  }): Promise<FormEntry | null>

  getResponseById(id: string): Promise<FormEntry | null>;

}