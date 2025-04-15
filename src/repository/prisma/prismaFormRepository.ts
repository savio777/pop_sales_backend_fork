import { FormEntry, FormTemplate, FormType, QuestionType, Prisma } from "@prisma/client";
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

type FormTemplateWithEntries = Prisma.FormTemplateGetPayload<{
  include: {
    questions: true;
    formEntries: {
      include: {
        answers: true;
        formTemplate: {
          include: {
            questions: true;
          }
        }
      }
    }
  }
}>;

type GetFormEntryByUserId = Prisma.FormEntryGetPayload<{
  include: {
    answers: true,
    formTemplate: {
      include: {
        questions: true,
        formEntries: {
          include: {
            answers: true,
            formTemplate: {
              include: {
                questions: true
              }
            }
          }
        }
      }
    },
  }
}>;


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

  async listEntryByFormId(formId: string): Promise<FormTemplateWithEntries | null> {
    return await db.formTemplate.findUnique({
      where: {
        id: formId
      }, 
      include: {
        questions: true,
        formEntries: {
          include: {
            answers: true,
            formTemplate: {
              include: {
                questions: true
              }
            }
          }
        }
      }
    });
  }

  async delete(id: string): Promise<void> {
    await db.$transaction([
      // Delete all answers from form entries
      db.answer.deleteMany({
        where: {
          formEntry: {
            formTemplateId: id
          }
        }
      }),

      // Delete all form entries
      db.formEntry.deleteMany({
        where: {
          formTemplateId: id
        }
      }),

      // Delete all questions
      db.question.deleteMany({
        where: {
          formTemplateId: id
        }
      }),
      
      // Finally delete the form template
      db.formTemplate.delete({
        where: {
          id: id
        }
      })
    ]);
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

  async listByUserId(userId: string): Promise<GetFormEntryByUserId[]> {
    const data = await db.formEntry.findMany({
      where: {
        userId
      }, 
      include: {
        answers: true,
        formTemplate: {
          include: {
            questions: true,
            formEntries: {
              include: {
                answers: true,
                formTemplate: {
                  include: {
                    questions: true
                  }
                }
              }
            }
          }
        },
      }
    })
    return data
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

  async update(
    {formId, form, questions }:
    {formId: string, form: CreateForm, questions: CreateQuestion[] }
    ): Promise<FormTemplate> {
      await db.$transaction([
        // Delete existing questions
        db.question.deleteMany({
          where: {
            formTemplateId: formId,
          }
        }),
        
        // Update form template and create new questions
        db.formTemplate.update({
          where: {
            id: formId
          },
          data: {
            ...(form.formType? { formType: form.formType } : {}),
            companyId: form.companyId,
            questions: {
              createMany: {
                data: questions.map((question) => ({
                  text: question.text,
                  required: question.required,
                  type: question.type
                }))
              }
            }
          }
        })
      ]);
  
      // Return updated form with questions
      return await db.formTemplate.findUnique({
        where: { id: formId },
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
      }) as FormTemplate;
    }
}