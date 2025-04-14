import { FormEntry, FormTemplate, Question, Answer } from "@prisma/client";
import { NotFoundError } from "@/error/notfound.error";
import { FormRepository } from "@/repository/formRepository";

interface FormResponse {
  question: string;
  answer: string | null;
}

interface FormEntryResponse {
  id: string;
  userId: string;
  taskId: string;
  // formTemplateId: string;
  companyId: string;
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
    const data = await this.formRepository.getEntryById(id) as FormEntryWithRelations;
    if (!data) {
      throw new NotFoundError("Form response not found");
    }

    const form = data.formTemplate.questions.map((question) => {
      const answer = data.answers.find(
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
      id: data.id,
      userId: data.userId,
      taskId: data.taskId ?? "",
      // formTemplateId: data.formTemplateId,
      companyId: data.companyId ?? "",
      createdAt: data.createdAt,
      form,
    };

    return { formEntry };
  }
}
