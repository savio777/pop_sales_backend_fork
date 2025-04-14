import { FormEntry, FormTemplate, FormType, QuestionType } from "@prisma/client";
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

interface Answer {
  questionId: string;
  text: string;
  imageUrl?: string;
}

export class PrismaFormRepository implements FormRepository {

  async createFormEntry(
    { formId, answers, userId, companyId, taskId}:
    { formId: string; answers: Answer[]; userId?: string, companyId: string, taskId?: string }
  ): Promise<FormEntry | null> {
    return await db.formEntry.create({
      data: {
        ...(userId ? { userId } : {}),
        formTemplateId: formId,
        taskId,
        companyId,
        answers: {
          createMany: {
            data: answers.map((answer) => ({
              questionId: answer.questionId,
              imageUrl: answer.imageUrl ?? null,
              text: answer.text
            }))
          }
        }
      } 
    })
  }

  async getEntryById(id: string): Promise<FormEntry | null> {
    return await db.formEntry.findUnique({
      where: {
        id: id
      }, 
      include: {
        answers: true,
        formTemplate: {
          include: {
            questions: true
          }
        }
      }
    })
  }

  async listEntryByFormId(formId: string): Promise<FormEntry[] | null> {
    return await db.formEntry.findMany({
      where: {
        formTemplateId: formId
      }, 
      include: {
        answers: true,
        formTemplate: {
          include: {
            questions: true
          }
        }
      }
    })
  }

  async delete(id: string): Promise<void> {
    await db.formTemplate.delete({
      where: {
        id: id
      }
    });
  }
  
  async listByCompanyId(companyId: string): Promise<FormTemplate[]> {
    return await db.formTemplate.findMany({
      where: {
        companyId: companyId
      },
      include: {
        questions: {
          select: {
            id: true,
            text: true,
            required: true,
            type: true,
          }
        }
      }
    });
  }
  
  async getById(id: string): Promise<FormTemplate | null> {
    return await db.formTemplate.findUnique({
      where: {
        id: id
      },
      include: {
        questions: {
          select: {
            id: true,
            text: true,
            required: true,
            type: true,
          }
        }
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
      },
      include: {
        questions: {
          select: {
            id: true,
            text: true,
            required: true,
            type: true
          }
        }
      }
    });
  }

  async getFormEntryDetails({
      companyId,
      taskId,
      userId
    }: {
      companyId: string;
      taskId: string;
      userId: string;
    }): Promise<FormEntry | null> {
      return await db.formEntry.findFirst({
        where: {
          companyId,
          taskId,
          userId
        },
        include: {
          formTemplate: {
            include: {
              questions: {
                include: {
                  answers: true
                },
              }
            }
          },
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      });
  }
}