import { FormTemplate, FormType, QuestionType } from "@prisma/client";
import { FormRepository } from "../formRepository";
import { db } from "@/lib/prisma";

interface CreateForm {
  formType: FormType;
  companyId: string;
}

interface CreateQuestion {
  text: string;
  required: boolean;
  type: QuestionType; 
}

export class PrismaFormRepository implements FormRepository {
  async listByCompanyId(companyId: string): Promise<FormTemplate[]> {
    return await db.formTemplate.findMany({
      where: {
        companyId: companyId
      },
      include: {
        questions: true
      }
    });
  }
  
  async getById(id: string): Promise<FormTemplate | null> {
    return await db.formTemplate.findUnique({
      where: {
        id: id
      },
      include: {
        questions: true
      }
    });
  }
  
  async create(
    {form, questions}:
    {form: CreateForm, questions: CreateQuestion[]}
  ): Promise<FormTemplate> {

    return await db.formTemplate.create({
      data: {
        formType: form.formType,
        companyId: form.companyId,
        questions: {
          createMany: {
            data: questions.map((question) => ({
              text: question.text,
              required: question.required,
              type: question.type
            }))
          }
        },
      }
    });
    
  }
}