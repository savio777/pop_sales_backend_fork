import { FormEntry, FormTemplate, Question, Answer } from "@prisma/client";
import { NotFoundError } from "@/error/notfound.error";
import { FormRepository } from "@/repository/formRepository";

interface FormResponse {
  question: string;
  answer: string | null;
}

interface FormEntryResponse {
  id: string;
  userId: string | null;
  taskId: string | null;
  // formTemplateId: string;
  companyId: string | null;
  createdAt: Date;
  form: FormResponse[];
}

interface FormEntryWithRelations extends FormEntry {
  formTemplate: FormTemplate & {
    questions: Question[];
  };
  answers: (Answer & {
    question: Question;
  })[];
}

export class GetFormEntryByIdUseCase {
  constructor(private readonly formRepository: FormRepository) {}

  async execute(id: string): Promise<{ formEntry: FormEntryResponse }> {
    const formExist = (await this.formRepository.getEntryById(
      id
    )) as FormEntryWithRelations;
    
    if (!formExist) {
      throw new NotFoundError("Formulário não encontrado");
    }

    const form = formExist.formTemplate.questions.map((question) => {
      const answer = formExist.answers.find(
        (res) => res.questionId === question.id
      );

      return {
        question: question.text,
        answer: answer?.text || null,
        required: question.required,
        type: question.type,
        imageUrl: answer?.imageUrl || null,
      };
    });

    const formEntry: FormEntryResponse = {
      id: formExist.id,
      userId: formExist.userId ?? null,
      taskId: formExist.taskId ?? null,
      // formTemplateId: data.formTemplateId,
      companyId: formExist.companyId ?? null,
      createdAt: formExist.createdAt,
      form,
    };

    return { formEntry };
  }
}
