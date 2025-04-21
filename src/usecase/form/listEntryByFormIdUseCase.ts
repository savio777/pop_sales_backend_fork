import { $Enums, FormType, QuestionType } from "@prisma/client";
import { NotFoundError } from "@/error/notfound.error";
import { FormRepository } from "@/repository/formRepository";

interface EntriesResponse {
	id: string;
	formType: FormType;
	companyId: string;
	createdAt: Date;
	userId: string | null;
	taskId: string | null;
	questions: {
		id: string;
		text: string;
		required: boolean;
		type: $Enums.QuestionType;
}[];
	formEntries: {
		id: string;
    createdAt: Date;
    userId: string | null;
    taskId: string | null;
    answers: {
        id: string;
        text: string | null;
        imageUrl: string | null;
        questionId: string;
    }[];
	}[];
}

export class ListEntryByFormIdUseCase {
  constructor(
    private readonly formRepository: FormRepository
  ) {}

  async execute(formId: string){
    const result = await this.formRepository.listEntryByFormId(formId);
    if (!result) {
      throw new NotFoundError("Form not found");
    }

    const formEntries = result.formEntries.map(entry => ({
      id: entry.id,
      createdAt: entry.createdAt,
      userId: entry.userId,
      taskId: entry.taskId,
      answers: entry.answers.map(answer => ({
        id: answer.id,
        text: answer.text,
        imageUrl: answer.imageUrl,
        questionId: answer.questionId
      })),
    }));

		const entries: EntriesResponse = {
			id: result.id,
			createdAt: result.createdAt,
			formType: result.formType,
			companyId: result.companyId,
			questions: result.questions.map(e => ({ 
				id: e.id,
				text: e.text,
				required: e.required,
				type: e.type
			})),
			formEntries,
			userId: result.formEntries[0]?.userId ?? null,
			taskId: result.formEntries[0]?.taskId ?? null
		};
		

    return { entries };
  }
}