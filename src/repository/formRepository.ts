import { FormTemplate, FormType, QuestionType } from "@prisma/client";

interface CreateForm {
  formType: FormType;
  companyId: string;
}

interface CreateQuestion {
  text: string;
  required: boolean;
  type: QuestionType; 
}

export interface FormRepository {
  create(
    {form, questions}:
    {form: CreateForm, questions: CreateQuestion[]}
  ): Promise<FormTemplate>;

  getById(id: string): Promise<FormTemplate | null>;

  listByCompanyId(companyId: string): Promise<FormTemplate[]>;
  
}